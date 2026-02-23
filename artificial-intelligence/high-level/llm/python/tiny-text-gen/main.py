from transformers import pipeline

def generate_text(prompt: str):
    print(f"Loading model...")
    # 'gpt2' is ~500MB. For even smaller, try 'sshleifer/tiny-gpt2' (just for testing)
    generator = pipeline('text-generation', model='gpt2')

    print(f"Generating response for: {prompt}\n" + "-"*30)

    # Generate
    results = generator(
        prompt,
        max_length=50,
        num_return_sequences=1,
        truncation=True,
        pad_token_id=50256 # Standard for GPT-2
    )

    return results[0]['generated_text']

if __name__ == "__main__":
    user_input = "Who is Harry Potter?"
    output = generate_text(user_input)
    print(output)
