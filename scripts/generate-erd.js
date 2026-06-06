const { createCanvas } = require('canvas');
const fs = require('node:fs');
const path = require('node:path');

const canvas = createCanvas(1200, 900);
const ctx = canvas.getContext('2d');

const TITLE_FONT = 'bold 18px Arial';
const HEADER_FONT = 'bold 14px Arial';
const FIELD_FONT = '13px Arial';
const TITLE_COLOR = '#2c3e50';
const HEADER_BG = '#3498db';
const FIELD_ALT = '#f5f6fa';
const BORDER_COLOR = '#bdc3c7';
const LINE_COLOR = '#e74c3c';
const PK_COLOR = '#e74c3c';

const tables = [
  {
    name: 'users',
    x: 50, y: 60,
    fields: [
      { name: 'id (PK)',    type: 'VARCHAR(50)' },
      { name: 'username',   type: 'VARCHAR(100)' },
      { name: 'email',      type: 'VARCHAR(100)' },
      { name: 'password',   type: 'VARCHAR(255)' },
      { name: 'full_name',  type: 'VARCHAR(255)' },
      { name: 'created_at', type: 'TIMESTAMP' },
      { name: 'updated_at', type: 'TIMESTAMP' },
    ]
  },
  {
    name: 'companies',
    x: 350, y: 60,
    fields: [
      { name: 'id (PK)',      type: 'VARCHAR(50)' },
      { name: 'name',         type: 'VARCHAR(255)' },
      { name: 'description',  type: 'TEXT' },
      { name: 'location',     type: 'VARCHAR(255)' },
      { name: 'email',        type: 'VARCHAR(100)' },
      { name: 'phone',        type: 'VARCHAR(50)' },
      { name: 'logo',         type: 'VARCHAR(255)' },
      { name: 'created_at',   type: 'TIMESTAMP' },
      { name: 'updated_at',   type: 'TIMESTAMP' },
    ]
  },
  {
    name: 'categories',
    x: 700, y: 60,
    fields: [
      { name: 'id (PK)',      type: 'VARCHAR(50)' },
      { name: 'name',         type: 'VARCHAR(255)' },
      { name: 'description',  type: 'TEXT' },
      { name: 'created_at',   type: 'TIMESTAMP' },
      { name: 'updated_at',   type: 'TIMESTAMP' },
    ]
  },
  {
    name: 'jobs',
    x: 50, y: 420,
    fields: [
      { name: 'id (PK)',          type: 'VARCHAR(50)' },
      { name: 'company_id (FK)',  type: 'VARCHAR(50)' },
      { name: 'category_id (FK)', type: 'VARCHAR(50)' },
      { name: 'title',            type: 'VARCHAR(255)' },
      { name: 'description',      type: 'TEXT' },
      { name: 'requirements',     type: 'TEXT' },
      { name: 'salary_min',       type: 'NUMERIC' },
      { name: 'salary_max',       type: 'NUMERIC' },
      { name: 'location',         type: 'VARCHAR(255)' },
      { name: 'type',             type: 'VARCHAR(50)' },
      { name: 'is_active',        type: 'BOOLEAN' },
      { name: 'created_at',       type: 'TIMESTAMP' },
      { name: 'updated_at',       type: 'TIMESTAMP' },
    ]
  },
  {
    name: 'applications',
    x: 450, y: 420,
    fields: [
      { name: 'id (PK)',        type: 'VARCHAR(50)' },
      { name: 'user_id (FK)',   type: 'VARCHAR(50)' },
      { name: 'job_id (FK)',    type: 'VARCHAR(50)' },
      { name: 'status',         type: 'VARCHAR(50)' },
      { name: 'cover_letter',   type: 'TEXT' },
      { name: 'created_at',     type: 'TIMESTAMP' },
      { name: 'updated_at',     type: 'TIMESTAMP' },
    ]
  },
  {
    name: 'bookmarks',
    x: 750, y: 420,
    fields: [
      { name: 'id (PK)',       type: 'VARCHAR(50)' },
      { name: 'user_id (FK)',  type: 'VARCHAR(50)' },
      { name: 'job_id (FK)',   type: 'VARCHAR(50)' },
      { name: 'created_at',    type: 'TIMESTAMP' },
    ]
  },
  {
    name: 'documents',
    x: 880, y: 640,
    fields: [
      { name: 'id (PK)',      type: 'VARCHAR(50)' },
      { name: 'user_id (FK)', type: 'VARCHAR(50)' },
      { name: 'name',         type: 'VARCHAR(255)' },
      { name: 'file_path',    type: 'VARCHAR(255)' },
      { name: 'type',         type: 'VARCHAR(50)' },
      { name: 'created_at',   type: 'TIMESTAMP' },
    ]
  },
  {
    name: 'authentications',
    x: 50, y: 650,
    fields: [
      { name: 'token', type: 'TEXT' },
    ]
  },
];

function getTableWidth(fields) {
  const maxNameLen = Math.max(...fields.map(f => f.name.length));
  return Math.max(180, maxNameLen * 8 + 40);
}

function getTableHeight(fields) {
  return 40 + fields.length * 24 + 10;
}

function drawTable(t) {
  const w = getTableWidth(t.fields);
  const h = getTableHeight(t.fields);
  const x = t.x;
  const y = t.y;

  ctx.fillStyle = HEADER_BG;
  ctx.fillRect(x, y, w, 40);

  ctx.strokeStyle = BORDER_COLOR;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, 40);

  ctx.fillStyle = '#fff';
  ctx.font = HEADER_FONT;
  ctx.textAlign = 'center';
  ctx.fillText(t.name, x + w / 2, y + 26);

  t.fields.forEach((f, i) => {
    const fy = y + 40 + i * 24;
    ctx.fillStyle = i % 2 === 0 ? '#fff' : FIELD_ALT;
    ctx.fillRect(x, fy, w, 24);

    ctx.strokeStyle = BORDER_COLOR;
    ctx.lineWidth = 1;
    ctx.strokeRect(x, fy, w, 24);

    ctx.fillStyle = f.name.includes('(PK)') ? PK_COLOR : '#2c3e50';
    ctx.font = FIELD_FONT;
    ctx.textAlign = 'left';
    ctx.fillText(f.name, x + 8, fy + 17);

    ctx.fillStyle = '#7f8c8d';
    ctx.textAlign = 'right';
    ctx.fillText(f.type, x + w - 8, fy + 17);
  });

  ctx.strokeStyle = BORDER_COLOR;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);
}

function drawLine(x1, y1, x2, y2) {
  ctx.strokeStyle = LINE_COLOR;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.setLineDash([]);
}

const relationships = [
  { from: 'companies', to: 'jobs', fromSide: 'right', toSide: 'left' },
  { from: 'categories', to: 'jobs', fromSide: 'bottom', toSide: 'top' },
  { from: 'users', to: 'applications', fromSide: 'bottom', toSide: 'top' },
  { from: 'users', to: 'bookmarks', fromSide: 'bottom', toSide: 'top' },
  { from: 'users', to: 'documents', fromSide: 'bottom', toSide: 'top' },
  { from: 'jobs', to: 'applications', fromSide: 'right', toSide: 'left' },
  { from: 'jobs', to: 'bookmarks', fromSide: 'right', toSide: 'left' },
];

function getCenter(t, side) {
  const w = getTableWidth(t.fields);
  const h = getTableHeight(t.fields);
  switch (side) {
    case 'left': return { x: t.x, y: t.y + h / 2 };
    case 'right': return { x: t.x + w, y: t.y + h / 2 };
    case 'top': return { x: t.x + w / 2, y: t.y };
    case 'bottom': return { x: t.x + w / 2, y: t.y + h };
  }
}

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, 1200, 900);

ctx.fillStyle = TITLE_COLOR;
ctx.font = TITLE_FONT;
ctx.textAlign = 'center';
ctx.fillText('Entity Relationship Diagram (ERD) - OpenJob Versi 1', 600, 30);

tables.forEach(drawTable);

const tableMap = {};
tables.forEach(t => { tableMap[t.name] = t; });

relationships.forEach(rel => {
  const t1 = tableMap[rel.from];
  const t2 = tableMap[rel.to];
  if (t1 && t2) {
    const p1 = getCenter(t1, rel.fromSide);
    const p2 = getCenter(t2, rel.toSide);
    drawLine(p1.x, p1.y, p2.x, p2.y);
  }
});

const outputPath = path.resolve(__dirname, '../ERD-OpenJob-versi-1.png');
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(outputPath, buffer);
console.log(`ERD saved to ${outputPath}`);
