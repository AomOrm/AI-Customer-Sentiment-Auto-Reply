// Stores demo data used by the prototype screens.
export const PERSONAS = [
{ id: 'friendly', emoji: '🤗', label: 'เป็นกันเอง', sub: 'อบอุ่น เข้าถึงง่าย ใช้คำพูดสบายๆ' },
{ id: 'professional', emoji: '💼', label: 'เป็นทางการ', sub: 'สุภาพ น่าเชื่อถือ ภาษาเรียบร้อย' },
{ id: 'casual', emoji: '✌️', label: 'ชิลๆ', sub: 'เหมือนคุยกับเพื่อน ใช้คำพูดง่ายๆ' },
{ id: 'cute', emoji: '🌸', label: 'น่ารักสดใส', sub: 'ใช้คำลงท้ายน่ารัก มีอีโมจิเยอะ' }];

export const CATEGORIES = [
{ id: 'cafe', label: 'คาเฟ่', emoji: '☕' },
{ id: 'food', label: 'อาหาร', emoji: '🍜' },
{ id: 'fashion', label: 'แฟชั่น', emoji: '👗' },
{ id: 'beauty', label: 'ความงาม', emoji: '💄' },
{ id: 'wellness', label: 'สุขภาพ', emoji: '🧘' },
{ id: 'craft', label: 'งานคราฟท์', emoji: '🪡' },
{ id: 'pet', label: 'สัตว์เลี้ยง', emoji: '🐶' },
{ id: 'home', label: 'ของใช้ในบ้าน', emoji: '🏠' }];

export const SAMPLE_COMMENTS = [
'ขนมอร่อยมากค่ะ บรรจุภัณฑ์น่ารักด้วย จะกลับมาซื้ออีกแน่นอน',
'รอของนานเกินไปค่ะ สั่งไป 2 อาทิตย์แล้วยังไม่ได้',
'มีไซส์ M สีครีมไหมคะ อยากได้อีกตัวค่ะ',
'แพคเกจขาด แต่ของข้างในยังโอเคนะ',
'ราคาสูงไปนิด แต่คุณภาพคุ้มค่าครับ',
'ส่งเร็วมากกก ชอบแอดมินตอบเร็วด้วยค่ะ',
'ของไม่ตรงปก สีไม่เหมือนในรูปเลย ผิดหวังค่ะ',
'มีสาขาที่เชียงใหม่ไหมคะ'];

export const CONNECTORS = [
{ id: 'facebook', name: 'Facebook Page', sub: 'พิมพ์มาดี เบเกอรี่', icon: 'FB', color: '#1877F2', kind: 'page', status: 'connected', last: '2 นาทีที่แล้ว', count: 24, sample: ['ขนมอร่อยมากค่ะ บรรจุภัณฑ์น่ารักด้วย จะกลับมาซื้ออีกแน่นอน', 'ส่งเร็วมากกก ชอบแอดมินตอบเร็วด้วยค่ะ', 'มีสาขาที่เชียงใหม่ไหมคะ'] },
{ id: 'instagram', name: 'Instagram', sub: '@pimmadee.bakery', icon: 'IG', color: '#E1306C', kind: 'profile', status: 'connected', last: '8 นาทีที่แล้ว', count: 17, sample: ['ราคาสูงไปนิด แต่คุณภาพคุ้มค่าครับ', 'มีไซส์ M สีครีมไหมคะ อยากได้อีกตัวค่ะ'] },
{ id: 'tiktok', name: 'TikTok', sub: '@pimmadee', icon: 'TT', color: '#111111', kind: 'profile', status: 'connected', last: '15 นาที', count: 32, sample: ['ของไม่ตรงปก สีไม่เหมือนในรูปเลย ผิดหวังค่ะ', 'รสใหม่อร่อยมากกก ขอเพิ่มอีกได้ไหมคะ'] },
{ id: 'shopee', name: 'Shopee', sub: 'ร้าน pimmadee.official', icon: 'SP', color: '#EE4D2D', kind: 'shop', status: 'connected', last: '1 ชั่วโมง', count: 9, sample: ['แพคเกจขาด แต่ของข้างในยังโอเคนะ', 'รอของนานเกินไปค่ะ สั่งไป 2 อาทิตย์แล้วยังไม่ได้'] },
{ id: 'lazada', name: 'Lazada', sub: 'pimmadee bakery store', icon: 'LZ', color: '#0F146D', kind: 'shop', status: 'disconnected', last: '—', count: 0, sample: [] },
{ id: 'line', name: 'LINE OA', sub: '@pimmadee', icon: 'LN', color: '#06C755', kind: 'oa', status: 'syncing', last: 'กำลังซิงค์…', count: 0, sample: [] }];

export const APPROVED_DEMO = [
{ id: 'a1', date: '06/05/26 14:32', comment: 'ขนมอร่อยมากค่ะ บรรจุภัณฑ์น่ารักด้วย', sentiment: 'positive', reply: 'ขอบคุณมากนะคะคุณลูกค้า~ ดีใจที่ชอบบบ 🌸 รอบหน้าเรามีรสใหม่มาให้ลองด้วยนะคะ' },
{ id: 'a2', date: '06/05/26 12:18', comment: 'รอของนานเกินไป สั่งไป 2 อาทิตย์แล้ว', sentiment: 'negative', reply: 'ขอโทษจริงๆ นะคะที่ทำให้รอนาน 🙏 ทักแอดมินทางอินบ็อกซ์พร้อมเลขออเดอร์ให้หน่อยน้า เดี๋ยวเช็คให้ทันทีค่า' },
{ id: 'a3', date: '06/05/26 11:45', comment: 'มีไซส์ M สีครีมไหมคะ', sentiment: 'neutral', reply: 'มีค่าคุณลูกค้า~ ไซส์ M สีครีมยังเหลืออยู่นะคะ ทักอินบ็อกซ์มาจองได้เลยน้า 🌷' },
{ id: 'a4', date: '05/05/26 19:02', comment: 'ส่งเร็วมาก ชอบแอดมินตอบเร็ว', sentiment: 'positive', reply: 'ดีใจมากเลยค่า~ ขอบคุณที่ชมแอดมินนะค้าาา 🥹💕 ฝากกดติดตามเพจไว้ด้วยน้า' },
{ id: 'a5', date: '05/05/26 16:50', comment: 'ของไม่ตรงปก สีไม่เหมือนในรูป', sentiment: 'negative', reply: 'ขออภัยอย่างสูงเลยค่ะ 🙏 รบกวนส่งรูปสินค้าที่ได้รับมาให้แอดมินดูทางอินบ็อกซ์นะคะ ทางร้านยินดีดูแลให้ค่า' }];

export const PASTE_SAMPLE = [
  'ขนมอร่อยมากค่ะ บรรจุภัณฑ์น่ารักด้วย จะกลับมาซื้ออีกแน่นอน',
  'รอของนานเกินไปค่ะ สั่งไป 2 อาทิตย์แล้วยังไม่ได้',
  'มีไซส์ M สีครีมไหมคะ อยากได้อีกตัวค่ะ',
  'แพคเกจขาด แต่ของข้างในยังโอเคนะ',
  'ราคาสูงไปนิด แต่คุณภาพคุ้มค่าครับ',
  'ส่งเร็วมากกก ชอบแอดมินตอบเร็วด้วยค่ะ',
  'ของไม่ตรงปก สีไม่เหมือนในรูปเลย ผิดหวังค่ะ',
  'มีสาขาที่เชียงใหม่ไหมคะ',
];
