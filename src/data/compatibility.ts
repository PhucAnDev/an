// src/data/compatibility.ts
// Western Zodiac Compatibility Matrix — 12x12

export interface CompatibilityEntry {
  score: number; // 0-100
  title: string;
  description: string;
}

// Helper: each pair is stored once (lower key first alphabetically in ZODIAC_ORDER index)
// Key format: "sign1_sign2" where sign1 < sign2 in ZODIAC_ORDER index
const ZODIAC_ORDER_IDX: Record<string, number> = {
  aries: 0, taurus: 1, gemini: 2, cancer: 3, leo: 4, virgo: 5,
  libra: 6, scorpio: 7, sagittarius: 8, capricorn: 9, aquarius: 10, pisces: 11,
};

const RAW: Record<string, CompatibilityEntry> = {
  // Same sign
  'aries_aries':           { score: 72, title: 'Lửa cháy đôi', description: 'Hai Bạch Dương cùng nhau tạo ra năng lượng khổng lồ. Hãy thoả thuận về ai dẫn đầu!' },
  'aries_taurus':          { score: 58, title: 'Lửa gặp đất', description: 'Tốc độ của Bạch Dương và sự kiên định của Kim Ngưu cần điều chỉnh nhưng có thể bổ sung cho nhau.' },
  'aries_gemini':          { score: 84, title: 'Lửa và gió', description: 'Cặp đôi năng động! Bạch Dương dẫn đường, Song Tử thổi thêm ý tưởng — sức mạnh kết hợp tuyệt vời.' },
  'aries_cancer':          { score: 52, title: 'Lửa và nước', description: 'Bạch Dương bốc đồng, Cự Giải nhạy cảm. Cần sự kiên nhẫn và thấu hiểu từ cả hai phía.' },
  'aries_leo':             { score: 92, title: 'Đôi ngọn lửa huyền thoại', description: 'Bạch Dương + Sư Tử = Cặp đôi Lửa huyền thoại! Đam mê, nhiệt huyết và sự tôn trọng lẫn nhau.' },
  'aries_virgo':           { score: 48, title: 'Lửa gặp đất cẩn thận', description: 'Bạch Dương táo bạo, Xử Nữ thận trọng. Cần nỗ lực để tìm tiếng nói chung nhưng có thể học hỏi từ nhau.' },
  'aries_libra':           { score: 78, title: 'Đối lập thu hút', description: 'Bạch Dương và Thiên Bình là hai đối cực — sự khác biệt tạo nên sức hút mạnh mẽ và cân bằng.' },
  'aries_scorpio':         { score: 65, title: 'Lửa và bí ẩn', description: 'Cả hai đầy đam mê nhưng theo cách khác nhau. Thiên Yết sâu sắc, Bạch Dương bề nổi — cần thời gian.' },
  'aries_sagittarius':     { score: 89, title: 'Đôi nhà thám hiểm', description: 'Hai cung Lửa cùng yêu tự do và phiêu lưu — mối quan hệ đầy phấn khích và truyền cảm hứng!' },
  'aries_capricorn':       { score: 55, title: 'Lửa gặp đá', description: 'Bạch Dương muốn ngay lập tức, Ma Kết muốn lâu dài. Cần thỏa hiệp giữa tốc độ và sự bền vững.' },
  'aries_aquarius':        { score: 80, title: 'Lửa và gió đổi mới', description: 'Cả hai yêu sự mới lạ và độc lập. Bảo Bình truyền cảm hứng, Bạch Dương hành động — đội tuyệt vời!' },
  'aries_pisces':          { score: 60, title: 'Lửa và mộng mơ', description: 'Bạch Dương thực tế, Song Ngư mơ mộng. Nếu tôn trọng sự khác biệt, có thể tạo ra điều kỳ diệu.' },
  'taurus_taurus':         { score: 76, title: 'Đôi bất động', description: 'Sự ổn định và an toàn là ưu tiên hàng đầu. Cuộc sống vật chất phong phú nhưng cần tránh trì trệ.' },
  'taurus_gemini':         { score: 55, title: 'Đất và gió', description: 'Kim Ngưu kiên định, Song Tử thay đổi liên tục. Cần kiên nhẫn để tìm nhịp điệu chung.' },
  'taurus_cancer':         { score: 88, title: 'Đôi tổ ấm', description: 'Cả hai đều yêu gia đình và sự an toàn. Mối quan hệ ổn định, ấm áp và lâu bền tuyệt vời.' },
  'taurus_leo':            { score: 62, title: 'Đất và lửa kiêu hãnh', description: 'Cả hai đều bướng bỉnh theo cách riêng. Cần nhường nhịn để phát huy điểm mạnh của nhau.' },
  'taurus_virgo':          { score: 90, title: 'Đất gặp đất hoàn hảo', description: 'Kim Ngưu và Xử Nữ cùng nguyên tố Đất — sự hiểu nhau sâu sắc, thực tế và bền vững.' },
  'taurus_libra':          { score: 72, title: 'Sao Kim hội ngộ', description: 'Cả hai do Sao Kim cai quản — yêu vẻ đẹp, sự sang trọng và tình yêu. Hài hòa tự nhiên.' },
  'taurus_scorpio':        { score: 68, title: 'Đối cực huyền bí', description: 'Kim Ngưu ổn định, Thiên Yết bí ẩn — sức hút mạnh mẽ nhưng cần vượt qua sự khác biệt sâu sắc.' },
  'taurus_sagittarius':    { score: 50, title: 'Đất và ngọn lửa tự do', description: 'Kim Ngưu muốn an toàn, Nhân Mã muốn tự do. Cần thỏa hiệp lớn để cùng tiến về phía trước.' },
  'taurus_capricorn':      { score: 87, title: 'Đôi đất vững chắc', description: 'Hai cung Đất cùng nhau xây dựng đế chế! Thực tế, kiên định và bền vững theo thời gian.' },
  'taurus_aquarius':       { score: 45, title: 'Đất và gió lạ', description: 'Kim Ngưu truyền thống, Bảo Bình đột phá. Thế giới quan khác nhau cần nỗ lực lớn để kết nối.' },
  'taurus_pisces':         { score: 82, title: 'Đất và mộng mơ', description: 'Kim Ngưu cho Song Ngư nền tảng, Song Ngư cho Kim Ngưu màu sắc — bổ sung hoàn hảo.' },
  'gemini_gemini':         { score: 70, title: 'Gió xoáy tứ phía', description: 'Hai Song Tử cùng nhau — vui vẻ, thông minh nhưng dễ thiếu định hướng. Cần ai đó chọn hướng đi.' },
  'gemini_cancer':         { score: 58, title: 'Gió và cảm xúc', description: 'Song Tử lý trí, Cự Giải cảm tính. Cần nỗ lực để lắng nghe ngôn ngữ của nhau.' },
  'gemini_leo':            { score: 85, title: 'Gió thổi ngọn lửa', description: 'Song Tử và Sư Tử cùng yêu sự vui vẻ xã hội. Bộ đôi tỏa sáng và đầy sức hút trong mọi đám đông.' },
  'gemini_virgo':          { score: 60, title: 'Thủy tinh kép', description: 'Cả hai do Sao Thủy cai quản nhưng khác phong cách. Song Tử tổng quát, Xử Nữ tỉ mỉ — cần dung hòa.' },
  'gemini_libra':          { score: 90, title: 'Gió hội gió', description: 'Hai cung Khí tuyệt vời! Trí tuệ, xã hội và giao tiếp — cuộc hôn nhân của những tâm hồn đồng điệu.' },
  'gemini_scorpio':        { score: 53, title: 'Gió và chiều sâu', description: 'Song Tử bề ngoài, Thiên Yết chiều sâu. Sự hấp dẫn ban đầu nhưng cần nỗ lực để duy trì kết nối.' },
  'gemini_sagittarius':    { score: 84, title: 'Gió và lửa phiêu lưu', description: 'Cặp đối cực thu hút nhau! Cả hai yêu tự do, kiến thức và khám phá — đội ngũ hoàn hảo.' },
  'gemini_capricorn':      { score: 48, title: 'Gió và đá', description: 'Song Tử thích nghi, Ma Kết có cấu trúc. Khác biệt nhưng nếu kết hợp được sẽ rất mạnh.' },
  'gemini_aquarius':       { score: 88, title: 'Gió đổi mới', description: 'Hai cung Khí đều yêu trí tuệ và đổi mới. Sự kết nối tâm trí sâu sắc và đầy cảm hứng.' },
  'gemini_pisces':         { score: 62, title: 'Gió và mộng', description: 'Song Tử thực tế, Song Ngư mơ mộng. Có thể bổ sung cho nhau nếu tôn trọng sự khác biệt.' },
  'cancer_cancer':         { score: 80, title: 'Biển sâu cảm xúc', description: 'Hai Cự Giải hiểu nhau sâu sắc nhưng dễ ngập trong cảm xúc. Cần ai đó là neo đậu lý trí.' },
  'cancer_leo':            { score: 70, title: 'Trăng và Mặt Trời', description: 'Mặt Trăng (Cự Giải) và Mặt Trời (Sư Tử) — âm dương bổ sung nhau, tạo ra sự cân bằng đẹp đẽ.' },
  'cancer_virgo':          { score: 78, title: 'Chăm sóc lẫn nhau', description: 'Cả hai đều muốn phục vụ người thân yêu. Sự kết hợp ấm áp và thực tế — tổ ấm hoàn hảo.' },
  'cancer_libra':          { score: 58, title: 'Nước và cân bằng', description: 'Cự Giải cảm tính, Thiên Bình lý trí về tình yêu. Cần nỗ lực để hiểu ngôn ngữ yêu thương.' },
  'cancer_scorpio':        { score: 93, title: 'Đôi nước huyền diệu', description: 'Hai cung Nước kết nối ở cấp độ tâm linh sâu sắc nhất. Tình yêu mãnh liệt và sự hiểu nhau không cần lời.' },
  'cancer_sagittarius':    { score: 50, title: 'Ổ ấm và đường chân trời', description: 'Cự Giải muốn mái ấm, Nhân Mã muốn chân trời. Cần thỏa hiệp lớn về không gian cá nhân.' },
  'cancer_capricorn':      { score: 74, title: 'Trái tim và khối óc', description: 'Đối cực thu hút — Cự Giải mang tình cảm, Ma Kết mang sự ổn định. Bổ sung nhau hoàn hảo.' },
  'cancer_aquarius':       { score: 45, title: 'Cảm xúc và lý trí lạnh', description: 'Cự Giải cần cảm xúc gần gũi, Bảo Bình cần không gian. Cần nhiều nỗ lực để kết nối.' },
  'cancer_pisces':         { score: 92, title: 'Đại dương tâm hồn', description: 'Hai cung Nước — sự đồng cảm và hiểu nhau ở cấp độ vũ trụ. Tình yêu lãng mạn và sâu sắc nhất.' },
  'leo_leo':               { score: 68, title: 'Hai Mặt Trời', description: 'Hai Sư Tử cùng nhau — tỏa sáng nhưng cần sân khấu chung. Ai nhường ai là câu hỏi lớn.' },
  'leo_virgo':             { score: 60, title: 'Hoàng đế và thư ký', description: 'Sư Tử dẫn đầu, Xử Nữ hoàn thiện chi tiết. Có thể là đội tuyệt vời nếu tôn trọng vai trò nhau.' },
  'leo_libra':             { score: 86, title: 'Lửa và phong cách', description: 'Cả hai yêu vẻ đẹp, xã hội và sự sang trọng. Cặp đôi tỏa sáng và được yêu thích trong mọi đám đông.' },
  'leo_scorpio':           { score: 62, title: 'Lửa và bóng tối', description: 'Hai cái tôi mạnh mẽ va chạm nhau. Cần học cách tôn trọng sức mạnh của đối phương để hòa hợp.' },
  'leo_sagittarius':       { score: 91, title: 'Đôi lửa bùng cháy', description: 'Hai cung Lửa cùng yêu cuộc sống! Đam mê, phiêu lưu và niềm vui — cặp đôi năng lượng nhất hoàng đạo.' },
  'leo_capricorn':         { score: 58, title: 'Lửa và đá lạnh', description: 'Sư Tử muốn được ngưỡng mộ, Ma Kết muốn kết quả. Cần tìm điểm gặp giữa xúc cảm và thực tiễn.' },
  'leo_aquarius':          { score: 75, title: 'Ngôi sao và dân chủ', description: 'Đối cực hấp dẫn — Sư Tử cá nhân, Bảo Bình tập thể. Học từ nhau để cùng mạnh mẽ hơn.' },
  'leo_pisces':            { score: 65, title: 'Lửa và biển', description: 'Sư Tử hào phóng, Song Ngư nhạy cảm. Nếu Sư Tử bảo vệ Song Ngư, mối quan hệ thật đẹp.' },
  'virgo_virgo':           { score: 74, title: 'Hoàn hảo gặp hoàn hảo', description: 'Hai Xử Nữ hiểu sự tỉ mỉ của nhau. Ngôi nhà ngăn nắp, cuộc sống có trật tự — nhưng ai tha thứ ai?' },
  'virgo_libra':           { score: 68, title: 'Tỉ mỉ và hài hòa', description: 'Xử Nữ phân tích, Thiên Bình cân nhắc — cả hai đều muốn điều đúng đắn theo cách của mình.' },
  'virgo_scorpio':         { score: 82, title: 'Sâu sắc và tỉ mỉ', description: 'Xử Nữ chú ý chi tiết, Thiên Yết nhìn thấu bề sâu — cả hai cùng tìm kiếm sự thật và hoàn hảo.' },
  'virgo_sagittarius':     { score: 55, title: 'Bản đồ và la bàn', description: 'Xử Nữ cần kế hoạch, Nhân Mã cần tự do. Có thể bổ sung cho nhau nếu vượt qua sự khác biệt.' },
  'virgo_capricorn':       { score: 89, title: 'Đất hoàn hảo', description: 'Hai cung Đất — sự chăm chỉ, thực tế và đáng tin cậy. Xây dựng được bất kỳ điều gì họ muốn.' },
  'virgo_aquarius':        { score: 52, title: 'Trật tự và hỗn độn', description: 'Xử Nữ thích cấu trúc, Bảo Bình thích đột phá. Cần tìm điểm cân bằng giữa truyền thống và đổi mới.' },
  'virgo_pisces':          { score: 76, title: 'Đất và mộng', description: 'Đối cực thu hút — Xử Nữ cho Song Ngư nền tảng thực tế, Song Ngư cho Xử Nữ trí tưởng tượng.' },
  'libra_libra':           { score: 78, title: 'Cân bằng kép', description: 'Hai Thiên Bình hiểu nhau hoàn hảo — nhưng ai quyết định? Cần ai đó dám chọn hướng đi.' },
  'libra_scorpio':         { score: 65, title: 'Hòa bình và bí ẩn', description: 'Thiên Bình muốn hòa hợp, Thiên Yết muốn chiều sâu. Cần nỗ lực để hiểu thế giới của nhau.' },
  'libra_sagittarius':     { score: 83, title: 'Khí và lửa', description: 'Thiên Bình yêu vẻ đẹp, Nhân Mã yêu triết học — cả hai đều yêu những cuộc trò chuyện khai sáng.' },
  'libra_capricorn':       { score: 62, title: 'Nghệ thuật và công việc', description: 'Thiên Bình muốn hài hòa, Ma Kết muốn thành công. Cần cân bằng giữa vui chơi và trách nhiệm.' },
  'libra_aquarius':        { score: 91, title: 'Gió lý tưởng', description: 'Hai cung Khí — trí tuệ, lý tưởng và nhân đạo. Cặp đôi có thể thay đổi thế giới cùng nhau.' },
  'libra_pisces':          { score: 70, title: 'Nghệ sĩ kép', description: 'Cả hai đều nhạy cảm với vẻ đẹp và nghệ thuật. Mối quan hệ lãng mạn và đầy cảm hứng sáng tạo.' },
  'scorpio_scorpio':       { score: 72, title: 'Chiều sâu vô tận', description: 'Hai Thiên Yết hiểu nhau ở cấp độ mà người khác không thể. Mãnh liệt nhưng cần tin tưởng lẫn nhau.' },
  'scorpio_sagittarius':   { score: 60, title: 'Bí ẩn và tự do', description: 'Thiên Yết muốn sâu sắc, Nhân Mã muốn tự do. Cần thoả thuận về không gian và sự kết nối.' },
  'scorpio_capricorn':     { score: 85, title: 'Quyết tâm kép', description: 'Cả hai đều kiên định và tham vọng. Khi kết hợp, họ đạt được bất kỳ mục tiêu nào họ đặt ra.' },
  'scorpio_aquarius':      { score: 55, title: 'Bí ẩn và minh bạch', description: 'Thiên Yết bí ẩn, Bảo Bình minh bạch. Thế giới quan khác nhau cần nỗ lực để xây dựng cầu nối.' },
  'scorpio_pisces':        { score: 94, title: 'Đại dương tâm linh', description: 'Hai cung Nước — sự kết nối tâm linh và cảm xúc sâu nhất trong hoàng đạo. Tình yêu huyền diệu.' },
  'sagittarius_sagittarius': { score: 75, title: 'Đôi nhà thám hiểm', description: 'Hai Nhân Mã cùng nhau — vui vẻ, tự do nhưng ai là người ở nhà? Cần cam kết rõ ràng hơn.' },
  'sagittarius_capricorn': { score: 55, title: 'Tự do và trách nhiệm', description: 'Nhân Mã bay cao, Ma Kết đứng vững. Học từ nhau để vừa có tầm nhìn vừa có nền tảng.' },
  'sagittarius_aquarius':  { score: 88, title: 'Lửa và gió đổi mới', description: 'Cả hai yêu tự do, đổi mới và nhân đạo. Cặp đôi truyền cảm hứng nhau và thay đổi thế giới.' },
  'sagittarius_pisces':    { score: 68, title: 'Triết học và mộng mơ', description: 'Cả hai tìm kiếm ý nghĩa cuộc sống theo cách riêng. Có thể bổ sung nếu tôn trọng sự khác biệt.' },
  'capricorn_capricorn':   { score: 79, title: 'Đỉnh cao đôi', description: 'Hai Ma Kết cùng leo núi — bền vững và đáng tin cậy. Cần nhớ dừng lại và thưởng thức hành trình.' },
  'capricorn_aquarius':    { score: 58, title: 'Truyền thống và đổi mới', description: 'Ma Kết bảo thủ, Bảo Bình cách mạng. Có thể học rất nhiều từ nhau nếu vượt qua sự cứng đầu.' },
  'capricorn_pisces':      { score: 80, title: 'Thực tế và mộng mơ', description: 'Ma Kết cho Song Ngư hướng đi, Song Ngư cho Ma Kết thi ca. Bổ sung hoàn hảo cho nhau.' },
  'aquarius_aquarius':     { score: 78, title: 'Hai người đi trước thời đại', description: 'Hai Bảo Bình — ý tưởng bay cao và sự hiểu biết sâu sắc. Cần đảm bảo kết nối cảm xúc đủ.' },
  'aquarius_pisces':       { score: 65, title: 'Lý tưởng và mộng mơ', description: 'Cả hai đều muốn thế giới tốt đẹp hơn — chỉ là Bảo Bình bằng lý trí, Song Ngư bằng tâm hồn.' },
  'pisces_pisces':         { score: 82, title: 'Đại dương lãng mạn', description: 'Hai Song Ngư — sự đồng cảm và tình yêu sâu sắc. Cần ai đó đặt chân trên mặt đất thực tế hơn.' },
};

export function getCompatibility(sign1: string, sign2: string): CompatibilityEntry {
  const idx1 = ZODIAC_ORDER_IDX[sign1];
  const idx2 = ZODIAC_ORDER_IDX[sign2];

  if (idx1 === undefined || idx2 === undefined) {
    return { score: 50, title: 'Bí ẩn', description: 'Mối quan hệ này cần thêm thời gian để khám phá.' };
  }

  // Same sign
  if (sign1 === sign2) {
    const key = `${sign1}_${sign1}`;
    return RAW[key] || { score: 70, title: 'Đôi tâm hồn', description: 'Cùng nhau bạn hiểu nhau hoàn toàn.' };
  }

  // Build key — smaller index first
  const [a, b] = idx1 < idx2 ? [sign1, sign2] : [sign2, sign1];
  const key = `${a}_${b}`;
  return RAW[key] || { score: 60, title: 'Khám phá', description: 'Hành trình kết nối giữa hai bạn còn nhiều điều thú vị chờ đợi.' };
}
