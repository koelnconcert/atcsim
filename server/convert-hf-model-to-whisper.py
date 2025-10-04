#!/bin/env python3
#
# Refined whisper model on hugging face often (always?/normally?) have different layer/states names
# This script converts a given model to a model that is compliant with the original whisper code
# 
# Original script from https://github.com/openai/whisper/discussions/830#discussioncomment-10026678
import whisper
import re
import torch
import sys

def hf_to_whisper_states(text):
    text = re.sub('.layers.', '.blocks.', text)
    text = re.sub('.self_attn.', '.attn.', text)
    text = re.sub('.q_proj.', '.query.', text)
    text = re.sub('.k_proj.', '.key.', text)
    text = re.sub('.v_proj.', '.value.', text)
    text = re.sub('.out_proj.', '.out.', text)
    text = re.sub('.fc1.', '.mlp.0.', text)
    text = re.sub('.fc2.', '.mlp.2.', text)
    text = re.sub('.fc3.', '.mlp.3.', text)
    text = re.sub('.fc3.', '.mlp.3.', text)
    text = re.sub('.encoder_attn.', '.cross_attn.', text)
    text = re.sub('.cross_attn.ln.', '.cross_attn_ln.', text)
    text = re.sub('.embed_positions.weight', '.positional_embedding', text)
    text = re.sub('.embed_tokens.', '.token_embedding.', text)
    text = re.sub('model.', '', text)
    text = re.sub('attn.layer_norm.', 'attn_ln.', text)
    text = re.sub('.final_layer_norm.', '.mlp_ln.', text)
    text = re.sub('encoder.layer_norm.', 'encoder.ln_post.', text)
    text = re.sub('decoder.layer_norm.', 'decoder.ln.', text)
    text = re.sub('proj_out.weight', 'decoder.token_embedding.weight', text)
    return text

hf_model_filename = sys.argv[1]
whisper_model_name = sys.argv[2]
output_model_filename = sys.argv[3]

print("loading hugging face model", hf_model_filename)
hf_state_dict = torch.load(hf_model_filename, map_location=torch.device('cpu'))    # pytorch_model.bin file

print("renaming layers")
for key in list(hf_state_dict.keys())[:]:
    new_key = hf_to_whisper_states(key)
    hf_state_dict[new_key] = hf_state_dict.pop(key)

print("loading whisper model", whisper_model_name)
model = whisper.load_model(whisper_model_name)

print("saving new model", output_model_filename)
torch.save({
    "dims": model.dims.__dict__,
    "model_state_dict": hf_state_dict
}, output_model_filename)