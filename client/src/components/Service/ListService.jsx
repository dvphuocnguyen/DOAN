import "./ListService.scss";

// icon
import { TfiMapAlt } from "react-icons/tfi";
import { PiNotePencilLight } from "react-icons/pi";
import { MdOutlineScreenShare } from "react-icons/md";
import { PiTicket } from "react-icons/pi";

///
const ListService = () => {
  return (
    <>
      <div className="list_service">
        <div className="service_item">
          <TfiMapAlt className="service_icon" />
          <p className="service_name">Tìm điểm đến</p>
          <p className="service_desc">
            Tìm điểm tham quan, khách sạn, nhà hàng, vé & tour dễ dàng và nhanh
            chóng.
          </p>
        </div>
        <div className="service_item">
          <PiNotePencilLight className="service_icon" />
          <p className="service_name">Lên lịch trình</p>
          <p className="service_desc">
            Chỉ cần nhập điểm đi, điểm đến TripHunter sẽ tự động tạo lịch trình
            cho bạn theo sở thích.
          </p>
        </div>
        <div className="service_item">
          <MdOutlineScreenShare className="service_icon" />
          <p className="service_name">Chỉnh sửa & chia sẻ</p>
          <p className="service_desc">
            Dễ dàng thêm, bớt hoặc sắp xếp lại lịch trình. Chia sẻ lịch trình và
            mời bạn bè cùng tham gia chuyến đi của bạn.
          </p>
        </div>
        <div className="service_item">
          <PiTicket className="service_icon" />
          <p className="service_name">Đặt vé trực tuyến</p>
          <p className="service_desc">
            Đặt tất cả các dịch vụ du lịch trên cùng một ứng dụng.
          </p>
        </div>
      </div>
      <div className="tour_recent">
        lich trinh duoc tao gan day
        <p>render tour</p>
        <p>render tour</p>
        <p>render tour</p>
        <p>render tour</p>
      </div>
      <div className="popular_tour">
        <p>ddieerm den pho bien</p>
        <p>render popular place</p>
      </div>
      <div className="top_good_price">
        <p>render top good price</p>
      </div>
      .
    </>
  );
};

export default ListService;
