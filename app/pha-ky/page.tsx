import { Header } from '@/components/Header';
import { RoyalScroll } from '@/components/RoyalScroll';

export default function PhaKyPage() {
  return (
    <main className="min-h-screen bg-[#C8BCA7] text-[#4A3F35] selection:bg-[#8C6D53]/20">
      <Header />
      <RoyalScroll title="Phả Ký">
        <p>
          Mộc bản chép rằng, dòng họ Cao ta khởi phát từ đất Phong Châu, ngàn năm văn hiến. 
          Tổ tiên xưa kia vốn là những bậc hiền tài, trọng nông tang, giữ gìn nếp nhà, 
          truyền lại cho con cháu muôn đời sau những giá trị cốt lõi của đạo làm người.
        </p>
        <p>
          Trải qua bao thăng trầm của lịch sử, dòng họ ta vẫn một lòng đoàn kết, 
          giữ vững gia phong. Từ đời Thủy Tổ Cao Văn A, người đã có công khai hoang lập ấp, 
          đến nay đã trải qua bao thế hệ, cành lá sum suê, con cháu thảo hiền.
        </p>
        <p>
          Nay lập bản Phả Ký này, cốt để con cháu đời sau soi chung một tấm gương sáng, 
          nhớ về cội nguồn, biết ơn tiên tổ, từ đó mà tu thân, tề gia, trị quốc, bình thiên hạ.
        </p>
      </RoyalScroll>
    </main>
  );
}
