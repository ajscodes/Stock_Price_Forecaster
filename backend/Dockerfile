FROM python:3.10-slim

# Install system dependencies needed for some python packages
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .

# Install CPU-only version of torch to save space and avoid CUDA errors
RUN pip install --no-cache-dir torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Hugging Face Spaces uses port 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
