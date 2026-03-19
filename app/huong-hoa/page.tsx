import { Header } from '@/components/Header';
import { RoyalScroll } from '@/components/RoyalScroll';

export default function HuongHoaPage() {
  return (
    <main className="min-h-screen bg-[#C8BCA7] text-[#4A3F35] selection:bg-[#8C6D53]/20">
      <Header />
      <RoyalScroll title="Hương Hoả">
        <p>
          Việc tế tự, hương hỏa là để tưởng nhớ công ơn sinh thành, dưỡng dục của tổ tiên. 
          Con cháu dòng họ Cao dù đi đâu về đâu, đến ngày giỗ chạp, lễ tết đều phải nhớ hướng về từ đường.
        </p>
        <p>
          <strong>Quỹ Hương Hoả:</strong> Do con cháu tự nguyện đóng góp, dùng vào việc tu bổ từ đường, 
          hương khói ngày rằm, mùng một, và tổ chức các ngày giỗ trọng của dòng họ.
        </p>
        <p>
          <strong>Trách Nhiệm:</strong> Trưởng tộc và Hội đồng gia tộc chịu trách nhiệm quản lý, 
          sử dụng quỹ minh bạch, công khai. Mọi khoản thu chi đều phải được ghi chép rõ ràng vào sổ sách.
        </p>
        <p>
          Nguyện cầu tổ tiên anh linh, phù hộ độ trì cho con cháu dòng họ Cao muôn đời hưng thịnh, 
          bình an, hạnh phúc.
        </p>
      </RoyalScroll>
    </main>
  );
}
