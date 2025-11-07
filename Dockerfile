FROM ubuntu:latest AS base-app
COPY pdf-api.tar .
RUN tar -xvzf && \
    pip install --no-cache-dir -r requirements.txt

FROM python:3.12-slim
COPY from=base-app
EXPOSE 5000
CMD ["python", "pdf_api.py"]
