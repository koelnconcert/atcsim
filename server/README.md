Install:

    python3 -m venv .venv
    source .venv/bin/activate
    pip3 install -r requirements

Download and convert model:

    MODEL=small.en
    wget -O jlvdoorn_whisper-$MODEL-atcosim.bin https://huggingface.co/jlvdoorn/whisper-$MODEL-atcosim/resolve/main/pytorch_model.bin
    python3 ./convert-hf-model-to-whisper.py jlvdoorn_whisper-$MODEL-atcosim.bin $MODEL jlvdoorn_whisper-$MODEL-atcosim.bin.whisper

Run:

    source .venv/bin/activate
    python3 sound-server.py
