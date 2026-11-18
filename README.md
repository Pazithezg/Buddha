# Buddha Project — ส่องพระดอทคอม AI (Dual-View Amulet AI)

ระบบ Full-Stack Web Application สำหรับสแกนพระเครื่อง 2 ด้าน (ด้านหน้าและด้านหลัง) เพื่อจำแนกรุ่น, แสดงวงกลมชี้จุดตำหนิ, ประเมิน % ความสมบูรณ์, คำนวณราคากลาง และแนะนำภูมิภาคที่ปล่อยเช่าได้ราคาดีที่สุด

## โครงสร้างโปรเจกต์
- `frontend/` — Next.js (App Router) + Tailwind CSS + ฟอนต์ซิกเนเจอร์ `Charmonman`
- `backend/` — FastAPI + OpenCV CLAHE + Ultralytics YOLO11 + Typhoon AI Q&A + ฐานข้อมูล `amulets_db.json` (8 รุ่น)
- `train_amulet_yolo11.ipynb` — สมุดโน้ต Google Colab สำหรับเทรนโมเดล `best.pt`

## วิธีรันใช้งาน

### 1. Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate  |  macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
*(หากมีไฟล์ `best.pt` ให้วางไว้ที่ `backend/models/best.pt` และตั้งค่า `TYPHOON_API_KEY` ใน `backend/.env`)*

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
เปิดเบราว์เซอร์ที่ `http://localhost:3000`

## License
MIT License — Copyright (c) 2026 Pasit Sukgasame
