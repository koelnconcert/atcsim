#!/bin/python3
import sys
import time

import numpy
import whisper
import sounddevice as sd
from bottle import route, run, request, abort, error
import speake3

sd.default.samplerate = 16000 # hardcoded in whisper/audio.py
sd.default.channels = 1

print("initalizing whisper")
model = whisper.load_model("base", device="cuda") # cpu vs. cuda

print("initalizing espeak")
tts = speake3.Speake()

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
  tts.set("voice", request.query.voice or "en")
  tts.set("speed", request.query.speed or "190")
  tts.set("pitch", request.query.pitch or "50")
  tts.say(text)
  tts.talkback()


@route("/tts/voices")
def tts_voices():
  voices = [ {
    "voice": voice["File"],
    "label": voice["VoiceName"],
    "gender": voice["Age/Gender"].lower()
  } for voice in tts.get("voices", "en") ]
  return { "voices": voices }

print("start webserver")
run(host="localhost", port=8080, debug=True)
