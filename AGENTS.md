# บันทึกโปรเจกต์

โปรเจกต์นี้คือเว็บแอปหน้าเดียว (Single Page App) สำหรับ `SiamReply` สร้างด้วย Vite + React และ Tailwind CSS โดยแปลงมาจาก mockup HTML แบบ standalone เดิม แอปเป็นเดโมสำหรับวิเคราะห์ sentiment ของคอมเมนต์ลูกค้า สร้างคำตอบอัตโนมัติ อนุมัติคำตอบ และดูภาพรวมในแดชบอร์ด

## Project Structure

โครงสร้างหลักของโปรเจกต์มีดังนี้

```text
.
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── dist/
├── tools/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── layouts/
    ├── pages/
    ├── components/
    ├── styles/
    ├── utils/
    └── mocks/
```

รายละเอียดแต่ละส่วน:

- `index.html` เป็น HTML entry point ของแอป มี `#root` สำหรับ mount React และมี fallback เพื่อให้ VS Code Live Server เปิดแอปจากไฟล์ build ใน `dist/` ได้
- `src/main.jsx` เป็นจุดเริ่มต้นของ React ทำหน้าที่ mount `<App />` เข้าไปที่ `#root` และโหลด global stylesheet
- `src/App.jsx` จัดการ state ระดับบนของแอป เช่น หน้าปัจจุบัน, ข้อมูลแบรนด์, รายการคอมเมนต์ที่วิเคราะห์แล้ว, รายการคำตอบที่อนุมัติแล้ว และ toast
- `src/layouts/` เก็บโครงหลักของแอป เช่น sidebar, top bar, mobile bottom navigation และ toast
- `src/pages/` เก็บหน้าหลักของแอป แยกตาม workflow ที่ผู้ใช้เห็น
- `src/components/` เก็บ component ที่ใช้ซ้ำได้ เช่น card, row, empty state, pill และ icon
- `src/styles/` เก็บ CSS global, Tailwind layers, design tokens และ utility class เฉพาะของแอป
- `src/utils/` เก็บ logic ที่ไม่ผูกกับ rendering โดยตรง เช่นการ classify sentiment และการสร้างคำตอบ
- `src/mocks/` เก็บข้อมูลตัวอย่างและ fixture ทั้งหมด ไม่ควร hard-code mock data ไว้ใน component
- `dist/` เป็นผลลัพธ์จาก `npm.cmd run build` สำหรับเปิดแบบ production หรือเปิดผ่าน Live Server
- `tools/` ใช้เก็บสคริปต์หรือไฟล์ช่วยงานภายในโปรเจกต์ ถ้ามีเพิ่มในอนาคต

## Source Files

ไฟล์สำคัญใน `src/`:

- `src/App.jsx` คุม page selection และส่ง props ให้ page ต่าง ๆ
- `src/layouts/AppLayout.jsx` คุม application shell ทั้ง desktop และ mobile
- `src/pages/SetupPage.jsx` หน้าตั้งค่าโปรไฟล์แบรนด์ บุคลิก น้ำเสียง และหมวดหมู่ธุรกิจ
- `src/pages/InboxPage.jsx` หน้าดึงคอมเมนต์ตัวอย่างจาก connector ที่ mock ไว้ วิเคราะห์ sentiment และสร้างคำตอบให้ตรวจ
- `src/pages/PastePage.jsx` หน้าวางคอมเมนต์เองเพื่อวิเคราะห์และสร้างคำตอบ
- `src/pages/DashboardPage.jsx` หน้าแดชบอร์ด แสดงสถิติ sentiment, ประวัติคำตอบที่อนุมัติ และ export CSV
- `src/components/common/CommentCard.jsx` แสดงคอมเมนต์ ผลวิเคราะห์ และคำตอบที่แก้ไข/อนุมัติได้
- `src/components/common/DistRow.jsx` แสดงแถวสรุปสัดส่วน sentiment
- `src/components/common/EmptyResults.jsx` แสดงสถานะว่างเมื่อยังไม่มีข้อมูล
- `src/components/common/FilterPill.jsx` ปุ่มกรองสถานะหรือ sentiment
- `src/components/common/StatCard.jsx` กล่องสถิติบนแดชบอร์ด
- `src/components/icons/Icons.jsx` รวม icon component ที่ใช้ใน UI
- `src/utils/replyEngine.js` รวม logic สำหรับ sentiment classification และ reply generation แบบ mock
- `src/mocks/demoData.js` รวม persona, category, connector, pasted comments และ approved replies
- `src/mocks/replyTemplates.js` รวม template คำตอบ AI แบบเดโม

## Mock Data

ให้เก็บข้อมูล mock/demo แยกจาก UI component เสมอ เพื่อให้ component อ่านง่ายและแก้ data ได้จากจุดเดียว

- ใช้ `src/mocks/demoData.js` สำหรับข้อมูล persona, category, connector, sample comments และ approved replies
- ใช้ `src/mocks/replyTemplates.js` สำหรับ template คำตอบ AI
- ถ้าต้องเพิ่มข้อมูลตัวอย่างใหม่ ให้เพิ่มใน `src/mocks/` ก่อน แล้วค่อย import ไปใช้ในหน้า/component
- หลีกเลี่ยงการประกาศ array ตัวอย่างขนาดใหญ่ไว้ใน component โดยตรง ยกเว้นเป็นข้อมูล UI เล็ก ๆ ที่ใช้เฉพาะจุดนั้นจริง ๆ

## Commands

คำสั่งหลักของโปรเจกต์:

```powershell
npm.cmd run dev
```

เริ่ม local development server ของ Vite เหมาะสำหรับตอนแก้โค้ด เพราะรองรับ hot reload

```powershell
npm.cmd run build
```

ตรวจ production build และสร้างไฟล์ใน `dist/`

```powershell
npm.cmd run preview
```

เปิด preview server สำหรับตรวจไฟล์ production build ในเครื่อง

สคริปต์ npm เรียก Vite ผ่าน `node ./node_modules/vite/bin/vite.js` เพื่อเลี่ยงปัญหา path บน Windows เมื่อชื่อโฟลเดอร์มีเครื่องหมาย `&`

## Live Server

โปรเจกต์นี้ไม่สามารถเปิด React source โดยตรงผ่าน Live Server ได้เหมือน HTML ธรรมดา เพราะ browser ไม่ได้ compile JSX, resolve npm imports หรือประมวลผล Tailwind/Vite pipeline ให้เอง

ตอนนี้โปรเจกต์รองรับการเปิดผ่าน Live Server แบบใช้ไฟล์ build แล้ว:

1. รัน build ก่อน

```powershell
npm.cmd run build
```

2. เปิด `index.html` ด้วย VS Code Live Server

3. `index.html` จะ fallback ไปโหลด `dist/assets/app.js` และ `dist/assets/index.css` ถ้า Vite dev server ไม่ได้ทำงาน

ข้อควรรู้:

- ถ้าแก้โค้ดใน `src/` แล้วเปิดด้วย Live Server ต้องรัน `npm.cmd run build` ใหม่
- ถ้าต้องการ workflow ที่เห็นผลทันที ให้ใช้ `npm.cmd run dev`
- `dist/` เป็นไฟล์ build ไม่ใช่ source หลัก จึงไม่ควรแก้ไฟล์ใน `dist/` ด้วยมือ

## Build Configuration

`vite.config.js` ตั้งค่าให้ production build ใช้ path แบบ relative และชื่อ asset คงที่ เพื่อให้ Live Server เปิดจาก project root ได้ง่าย:

- `base: './'` ทำให้ asset path เป็น relative
- `assets/app.js` เป็น JavaScript bundle หลัก
- `assets/index.css` เป็น CSS bundle หลัก

ถ้ามีการเปลี่ยนชื่อไฟล์ output ใน `vite.config.js` ต้องอัปเดต fallback ใน `index.html` ให้ตรงกันด้วย

## UI Notes

ข้อกำหนดด้าน UI ที่ควรรักษาไว้:

- application shell ไม่มี owner/profile block
- ไม่มี search field มุมขวาบน
- ไม่มี notification bell
- dashboard ไม่มี filter controls เพิ่มเติมนอกเหนือจากที่มีอยู่
- approved replies บน dashboard แสดงเป็นรายการครบถ้วน
- ปุ่ม `Export CSV` บน dashboard ต้องสร้างและดาวน์โหลดไฟล์ CSV จริงจาก approved replies ปัจจุบัน
- แต่ละส่วนใหญ่ของ UI ควรอยู่ใน component หรือ page file ที่ตั้งชื่อชัดเจน
- ไฟล์ source ใหม่ควรมี comment สั้น ๆ ด้านบนเพื่อบอก purpose ของไฟล์

## Development Guidelines

แนวทางตอนแก้หรือเพิ่มฟีเจอร์:

- รักษาโครงสร้างแยก concern ตามโฟลเดอร์เดิมก่อนเพิ่ม abstraction ใหม่
- ถ้าเป็นข้อมูลเดโม ให้เพิ่มใน `src/mocks/` แทนการฝังใน JSX
- ถ้าเป็น logic ที่ใช้ซ้ำหรือไม่เกี่ยวกับ rendering ให้ใส่ใน `src/utils/`
- ถ้าเป็น UI ที่ใช้ซ้ำหลายหน้า ให้ใส่ใน `src/components/common/`
- ถ้าเพิ่มหน้าหลักใหม่ ให้ใส่ใน `src/pages/` และเชื่อม state/page selection ผ่าน `src/App.jsx`
- ใช้ CSS token ที่ประกาศใน `src/styles/global.css` ก่อนเพิ่มสีหรือ style ใหม่
- หลังแก้พฤติกรรมสำคัญ ให้รัน `npm.cmd run build` เพื่อตรวจว่า production build ยังผ่าน
