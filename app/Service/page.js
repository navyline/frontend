import Navbar from '/app/component/nav';
import Footer from '/app/Footter/footter';
export default function about() {
    return (
      <>
      <Navbar />
      <div className="row">
        <div
          className="col-lg-6 mx-auto about"
          style={{
            backgroundColor: '#ffffff', // พื้นหลังสีขาว
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 className="text-center mb-4" style={{ color: '#333' }}>
          Service
          </h2>
          <img
            src="/img/544.jpg"
            className="img-fluid profile-pic mb-4"
            style={{
              border: '2px solid #ddd', // สีขอบรูปภาพ
              padding: '5px',
              borderRadius: '10px',
            }}
          />
          <p style={{ color: '#666' }}>
            Genshin Impact Hutao. ตัวละครระดับ 5 ดาว ที่เป็นธาตุไฟและใช้หอกในการต่อสู้ ในทีม เธอสามารถมีบทบาทเป็นตัวแทนจำหน่าย/สนับสนุนความเสียหายได้ ในคู่มือนี้ คุณจะได้เรียนรู้เกี่ยวกับงานสร้าง อาวุธ และสิ่งประดิษฐ์ที่ดีที่สุดของเธอ รวมถึงยูนิตที่เหมาะสมที่สุดกับเธอ
          </p>
          <a href="#" className="btn btn-danger">
           Hutao
          </a>
        </div>
      </div>
      <br></br>
    <Footer />
      </>
    );
  }
  