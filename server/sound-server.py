#!/bin/python3
import subprocess
import sys
import time

import numpy
import whisper
import sounddevice as sd
from kokoro import KPipeline
from bottle import route, run, request, response, abort, error, hook

def record(array):
  def callback(indata, frames, time, status):
    if status:
      print(status, file=sys.stderr)
    array.append(indata.copy())

  stream = sd.InputStream(callback=callback)
  stream.start()
  return stream


def transcribe(audio):
  audio = audio.flatten()
  audio = whisper.pad_or_trim(audio.flatten())
  mel = whisper.log_mel_spectrogram(audio).to(model.device)
  options = whisper.DecodingOptions(language="English", fp16=False)
  return whisper.decode(model, mel, options)


@route("/")
def root():
  return {"Hello!"}


@route("/asr/start")
def asr_start():
  global record_array
  global record_stream

  record_array = []
  record_stream = record(record_array)


@route("/asr/stop")
def asr_stop():
  global record_array
  global record_stream
  global recording
  record_stream.stop()
  record_stream.close()
  recording = numpy.concatenate(record_array)


@route("/asr/replay")
def asr_replay():
  sd.play(recording)
  sd.wait()


@route("/asr/transcribe")
def asr_transcribe():
  start = time.time()
  result = transcribe(recording)
  end = time.time()
  processing_duration = end - start
  recording_duration = recording.size / sd.default.samplerate
  print("recording={:.2f}s processing={:.2f}s process_ratio={:.2f} text={}"
        .format(recording_duration, processing_duration, recording_duration/processing_duration, result.text))
  return {
    "result": result.text
  }


@route("/tts/speak")
def tts_speak():
  text = request.query.text
  if (not text):
    abort(400, "query param 'text' is required")

  generator = kokoro_pipeline(text, 
    voice=request.query.voice or "af_heart"
  )
  for i, (gs, ps, audio) in enumerate(generator):
    sd.play(audio, samplerate=24000)
    sd.wait()


@route("/tts/voices")
def tts_voices():
  output = subprocess.check_output("espeak --voices=en", shell=True, text=True)
  #header line of output:
  #Pty  Language  Age/Gender  VoiceName  File  Other Languages
  lines = [ line.split(None, 5) for line in output.splitlines() ]
  voices = [ {
    "voice": line[4],
    "label": line[3],
    "gender": line[2].lower()
  } for line in lines[1:]]
  return { "voices": voices }

@hook('after_request')
def enable_cors():
  response.headers['Access-Control-Allow-Origin'] = '*'
  response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

def init_whisper():
  print("initalizing whisper")
  global model
  sd.default.samplerate = 16000 # hardcoded in whisper/audio.py
  sd.default.channels = 1
  model = whisper.load_model("jlvdoorn_whisper-small.en-atcosim.bin.whisper", device="cuda") # cpu vs. cuda

def init_kokoro():
  print("initalizing kokoro")
  global kokoro_pipeline
  kokoro_pipeline = KPipeline(
    lang_code='a', 
    repo_id='hexgrad/Kokoro-82M' # default, but prevents warning
  )

init_whisper()
init_kokoro()

print("start webserver")
run(host="localhost", port=8080, debug=True)
