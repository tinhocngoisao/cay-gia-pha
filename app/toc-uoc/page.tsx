import { Header } from '@/components/Header';
import { RoyalScroll } from '@/components/RoyalScroll';

export default function TocUocPage() {
  return (
    <main className="min-h-screen bg-[#C8BCA7] text-[#4A3F35] font-sans selection:bg-[#8C6D53]/20">
      <Header />
      <RoyalScroll title="Tộc Ước">
        <p><strong>Điều 1: Hiếu Kính Mẹ Cha</strong><br/>Phàm làm con cháu họ Cao, điều tiên quyết là phải giữ trọn đạo hiếu. Kính trọng ông bà, hiếu thảo với cha mẹ, anh em hòa thuận, nhường nhịn lẫn nhau.</p>
        <p><strong>Điều 2: Tôn Sư Trọng Đạo</strong><br/>Phải biết kính trọng người thầy, ham học hỏi, lấy chữ "Tâm" và chữ "Tài" làm trọng. Dù làm quan hay làm dân, đều phải giữ gìn phẩm giá, không làm điều xằng bậy.</p>
        <p><strong>Điều 3: Giữ Gìn Gia Phong</strong><br/>Nếp nhà phải được giữ nghiêm. Lời ăn tiếng nói phải từ tốn, trang nhã. Trang phục phải chỉnh tề, phù hợp với hoàn cảnh. Tuyệt đối không sa đà vào các tệ nạn xã hội.</p>
        <p><strong>Điều 4: Đoàn Kết Tương Trợ</strong><br/>Người trong họ phải biết yêu thương, đùm bọc lẫn nhau. Lúc tối lửa tắt đèn có nhau, khi hoạn nạn phải ra tay tương trợ, không được vô cảm, ích kỷ.</p>
      </RoyalScroll>
    </main>
  );
}
