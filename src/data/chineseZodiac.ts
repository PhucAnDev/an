// src/data/chineseZodiac.ts
// Chinese Zodiac — 12 animals

export interface ChineseZodiacSign {
  key: string;
  name: string;
  nameVi: string;
  emoji: string;
  element: string;
  yin: boolean; // true = Yin, false = Yang
  traits: string;
  strengths: string[];
  baseYear: number; // First year of the 12-year cycle in modern era
}

export const CHINESE_ZODIAC: ChineseZodiacSign[] = [
  {
    key: 'rat',
    name: 'Rat',
    nameVi: 'Chuột (Tý)',
    emoji: '🐭',
    element: 'Water',
    yin: false,
    baseYear: 1924,
    traits: 'Người tuổi Tý thông minh, lanh lợi và có tài kiếm tiền. Họ thích nghi nhanh và luôn tìm ra cách giải quyết sáng tạo.',
    strengths: ['Thông minh', 'Thích nghi tốt', 'Lanh lợi', 'Tiết kiệm'],
  },
  {
    key: 'ox',
    name: 'Ox',
    nameVi: 'Trâu (Sửu)',
    emoji: '🐂',
    element: 'Earth',
    yin: true,
    baseYear: 1925,
    traits: 'Người tuổi Sửu cần cù, đáng tin cậy và kiên định. Họ làm việc không mệt mỏi và luôn hoàn thành mọi việc đã cam kết.',
    strengths: ['Cần cù', 'Kiên định', 'Đáng tin cậy', 'Bình tĩnh'],
  },
  {
    key: 'tiger',
    name: 'Tiger',
    nameVi: 'Hổ (Dần)',
    emoji: '🐯',
    element: 'Wood',
    yin: false,
    baseYear: 1926,
    traits: 'Người tuổi Dần dũng cảm, tự tin và đầy nhiệt huyết. Họ là những nhà lãnh đạo thiên bẩm với sức hút mạnh mẽ.',
    strengths: ['Dũng cảm', 'Tự tin', 'Lãnh đạo', 'Nhiệt huyết'],
  },
  {
    key: 'rabbit',
    name: 'Rabbit',
    nameVi: 'Mèo (Mão)',
    emoji: '🐰',
    element: 'Wood',
    yin: true,
    baseYear: 1927,
    traits: 'Người tuổi Mão thanh lịch, điềm tĩnh và có óc phán đoán tốt. Họ sống có trật tự và luôn tạo ra môi trường hài hòa.',
    strengths: ['Thanh lịch', 'Điềm tĩnh', 'Thận trọng', 'Thông minh'],
  },
  {
    key: 'dragon',
    name: 'Dragon',
    nameVi: 'Rồng (Thìn)',
    emoji: '🐲',
    element: 'Earth',
    yin: false,
    baseYear: 1928,
    traits: 'Người tuổi Thìn hào phóng, mạnh mẽ và đầy sức sống. Họ là biểu tượng của sự thịnh vượng và may mắn trong văn hóa châu Á.',
    strengths: ['Hào phóng', 'Tự tin', 'Năng động', 'Sáng tạo'],
  },
  {
    key: 'snake',
    name: 'Snake',
    nameVi: 'Rắn (Tỵ)',
    emoji: '🐍',
    element: 'Fire',
    yin: true,
    baseYear: 1929,
    traits: 'Người tuổi Tỵ thông thái, sâu sắc và có trực giác nhạy bén. Họ thường ít nói nhưng suy nghĩ rất sâu xa.',
    strengths: ['Thông thái', 'Sâu sắc', 'Trực giác', 'Bí ẩn'],
  },
  {
    key: 'horse',
    name: 'Horse',
    nameVi: 'Ngựa (Ngọ)',
    emoji: '🐴',
    element: 'Fire',
    yin: false,
    baseYear: 1930,
    traits: 'Người tuổi Ngọ tự do, nhiệt tình và yêu thích phiêu lưu. Họ có sức hút tự nhiên và luôn hướng về phía trước.',
    strengths: ['Tự do', 'Nhiệt tình', 'Thân thiện', 'Cứng rắn'],
  },
  {
    key: 'goat',
    name: 'Goat',
    nameVi: 'Dê (Mùi)',
    emoji: '🐑',
    element: 'Earth',
    yin: true,
    baseYear: 1931,
    traits: 'Người tuổi Mùi nhẹ nhàng, sáng tạo và giàu lòng trắc ẩn. Họ có gu thẩm mỹ cao và yêu thiên nhiên.',
    strengths: ['Nhẹ nhàng', 'Sáng tạo', 'Trắc ẩn', 'Linh hoạt'],
  },
  {
    key: 'monkey',
    name: 'Monkey',
    nameVi: 'Khỉ (Thân)',
    emoji: '🐵',
    element: 'Metal',
    yin: false,
    baseYear: 1932,
    traits: 'Người tuổi Thân thông minh, hài hước và thích nghi. Họ là những người giải quyết vấn đề sáng tạo và luôn tìm ra cách thú vị.',
    strengths: ['Thông minh', 'Hài hước', 'Thích nghi', 'Sáng tạo'],
  },
  {
    key: 'rooster',
    name: 'Rooster',
    nameVi: 'Gà (Dậu)',
    emoji: '🐓',
    element: 'Metal',
    yin: true,
    baseYear: 1933,
    traits: 'Người tuổi Dậu cần cù, tự hào và có óc quan sát sắc bén. Họ thích trật tự và luôn chuẩn bị kỹ càng cho mọi việc.',
    strengths: ['Cần cù', 'Tự hào', 'Tỉ mỉ', 'Tự tin'],
  },
  {
    key: 'dog',
    name: 'Dog',
    nameVi: 'Chó (Tuất)',
    emoji: '🐕',
    element: 'Earth',
    yin: false,
    baseYear: 1934,
    traits: 'Người tuổi Tuất trung thành, chân thành và đáng tin cậy. Họ có khiếu phán đoán tốt và luôn sẵn sàng giúp đỡ.',
    strengths: ['Trung thành', 'Chân thành', 'Đáng tin cậy', 'Can đảm'],
  },
  {
    key: 'pig',
    name: 'Pig',
    nameVi: 'Lợn (Hợi)',
    emoji: '🐷',
    element: 'Water',
    yin: true,
    baseYear: 1935,
    traits: 'Người tuổi Hợi hào phóng, chân thành và yêu thích sự thoải mái. Họ có bản chất tốt bụng và luôn thấy điều tốt trong người khác.',
    strengths: ['Hào phóng', 'Chân thành', 'Tốt bụng', 'Kiên nhẫn'],
  },
];
