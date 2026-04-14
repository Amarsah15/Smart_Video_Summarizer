<div align="center">

# 🎬 AI Video Summarizer

**Convert long videos into crisp summaries with multilingual transcription, transcript-grounded Q&A, and export options.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://smart-video-summarizer-six.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend%20API-Render-46E3B7?style=for-the-badge&logo=render)](https://smart-video-summarizer-cjst.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github)](https://github.com/Amarsah15/Smart_Video_Summarizer)

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.135-009688?style=flat-square&logo=fastapi)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react)
![Whisper](https://img.shields.io/badge/OpenAI-Whisper-412991?style=flat-square&logo=openai)

</div>

---

## 📸 Screenshots

<div align="center">

### Home Screen

![Home Screen](/frontend/screenshots/dashboard.png)

### Upload & Configure

![Upload Screen](/frontend/screenshots/video_uploaded.png)

### Prcoessing Transcript

![Transcription Progress](/frontend/screenshots/processing.png)

### Summary Output

![Summary Screen](screenshots/summary.png)

</div>

---

## ✨ What It Does

| Step           | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| **Upload**     | Drop any video file into the web UI                              |
| **Transcribe** | Whisper extracts and transcribes speech (40+ languages)          |
| **Summarize**  | Generates a clean extractive summary                             |
| **Key Points** | Time-stamped highlights from the video                           |
| **Q&A**        | Ask questions — answers pulled directly from transcript evidence |
| **Export**     | Download results as TXT, PDF, or DOCX                            |

---

## 🚀 Features

- **Multilingual** — transcribe in original language or translate to English
- **Hinglish support** — built-in prompt for Hindi-English code-switched audio
- **Summary lengths** — `short`, `medium`, `long`
- **Summary styles** — `general`, `business`, `student`, `casual`
- **Time-based key points** with readable timestamps
- **Grounded Q&A** — answers backed by transcript evidence with source timestamps
- **Suggested questions** auto-generated from the summary
- **Async processing** — long videos run in the background with live progress polling
- **Job history** stored in SQLite
- **Optional speaker diarization** (requires HuggingFace token)

---

## 🛠️ Tech Stack

<div align="center">

| Layer                | Technology                                  |
| -------------------- | ------------------------------------------- |
| **Frontend**         | React + Vite + Tailwind CSS                 |
| **Backend**          | FastAPI + Uvicorn + Python 3.11             |
| **Transcription**    | OpenAI Whisper                              |
| **Summarization**    | Extractive NLP (no model download required) |
| **ML Runtime**       | PyTorch + Hugging Face Transformers         |
| **Media Processing** | FFmpeg + MoviePy                            |
| **Database**         | SQLite                                      |
| **Frontend Hosting** | Vercel                                      |
| **Backend Hosting**  | Render                                      |

</div>

---

## 📁 Project Structure

```
Smart_Video_Summarizer/
├── backend/
│   ├── main.py                 # FastAPI app and routes
│   ├── requirements.txt
│   ├── runtime.txt             # Pins Python 3.11.5
│   ├── .env                    # Local env vars (not committed)
│   ├── uploads/                # Temp video storage (auto-cleaned)
│   ├── outputs/                # Job history and audio files
│   └── utils/
│       ├── transcribe.py       # Whisper transcription
│       ├── summarize.py        # Extractive summarization
│       ├── rag.py              # Transcript Q&A
│       ├── diarize.py          # Speaker diarization
│       ├── extract_audio.py    # FFmpeg audio extraction
│       ├── job_store.py        # SQLite job tracking
│       └── moderation.py       # Optional content moderation
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites

- Python 3.11
- Node.js 18+
- FFmpeg on system PATH → [Download here](https://www.gyan.dev/ffmpeg/builds/)

```bash
ffmpeg -version   # should print version info
```

---

### Backend

```powershell
cd backend

# Create virtual environment with Python 3.11
py -3.11 -m venv .venv
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create your .env file and fill in values
# (see Configuration section below)

# Start the server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Visit `http://127.0.0.1:8000/` — you should see:

```json
{ "message": "AI Video Summarization Backend Running!" }
```

---

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5175` by default.

---

### `.env` Quick Start

Create `backend/.env`:

```env
ALLOWED_ORIGINS=http://localhost:5175,http://127.0.0.1:5175
WHISPER_MODEL=base
CONTENT_MODERATION_ENABLED=false
ASYNC_VIDEO_PROCESSING=true
FAST_SUMMARY_TRIGGER_WORDS=0
FAST_KEY_POINT_TRIGGER_SEGMENTS=0
```

<details>
<summary>📋 All environment variables</summary>
<br>

| Variable                               | Default                 | Description                                            |
| -------------------------------------- | ----------------------- | ------------------------------------------------------ |
| `ALLOWED_ORIGINS`                      | `http://localhost:5173` | CORS origin allowlist (comma-separated)                |
| `ALLOWED_ORIGIN_REGEX`                 | —                       | Regex for dynamic origins (e.g. Vercel preview URLs)   |
| `ASYNC_VIDEO_PROCESSING`               | `true`                  | Process videos in background thread                    |
| `VIDEO_PROCESSING_WORKERS`             | `2`                     | Background worker thread count                         |
| `WHISPER_MODEL`                        | `tiny`                  | Model size: `tiny`, `base`, `small`, `medium`, `large` |
| `WHISPER_ENGLISH_MODEL`                | `tiny.en`               | English-only Whisper model                             |
| `WHISPER_BEAM_SIZE`                    | `1`                     | Beam search width                                      |
| `WHISPER_BEST_OF`                      | `1`                     | Candidates per decode pass                             |
| `WHISPER_CPU_THREADS`                  | `0`                     | CPU thread limit (0 = auto)                            |
| `WHISPER_AUTO_LANGUAGE_RETRY`          | `false`                 | Retry with Hindi/English hints for Hinglish audio      |
| `WHISPER_HINGLISH_PROMPT`              | built-in                | Custom prompt for code-switched speech                 |
| `FAST_SUMMARY_TRIGGER_WORDS`           | `1800`                  | Set to `0` to always use extractive summarizer         |
| `FAST_KEY_POINT_TRIGGER_SEGMENTS`      | `40`                    | Set to `0` to always use extractive key points         |
| `CONTENT_MODERATION_ENABLED`           | `false`                 | Enable external content moderation                     |
| `CONTENT_MODERATION_API_URL`           | —                       | Moderation service endpoint                            |
| `CONTENT_MODERATION_API_KEY`           | —                       | Bearer token for moderation API                        |
| `CONTENT_MODERATION_THRESHOLD`         | `0.65`                  | Risk score threshold (0–1)                             |
| `PYANNOTE_TOKEN` / `HUGGINGFACE_TOKEN` | —                       | Required only for speaker diarization                  |

</details>

---

## 🔌 API Endpoints

| Method | Endpoint               | Description                         |
| ------ | ---------------------- | ----------------------------------- |
| `GET`  | `/`                    | Health check                        |
| `POST` | `/process-video`       | Upload and process a video          |
| `GET`  | `/video-jobs/{job_id}` | Get job progress and result         |
| `GET`  | `/video-jobs`          | List recent jobs                    |
| `POST` | `/ask-video`           | Ask a question against a transcript |

---

## 📄 License

MIT — feel free to use, modify, and distribute.

---

<div align="center">
Made with ❤️ by <a href="https://github.com/Amarsah15">Amarnath Kumar</a>
</div>
