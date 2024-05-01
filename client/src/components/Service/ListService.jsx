import "./ListService.scss";
//
// import { Link } from "react-router-dom";
import plan_img from "../../assets/image/tour_img_dn.png";
import avatar from "../../assets/image/avatar_user.jpg";
import bali_place from "../../assets/image/bali_popular_places.jpg";
// icon

import { TfiMapAlt } from "react-icons/tfi";
import { PiNotePencilLight } from "react-icons/pi";
import { MdOutlineScreenShare } from "react-icons/md";
import { PiTicket } from "react-icons/pi";

///
const ListService = () => {
  return (
    <div className="ui_container">
      {/* //listservice */}
      <div className="list_service  ">
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
            Chỉ cần nhập điểm đi, điểm đến Smatrasẽ tự động tạo lịch trình cho
            bạn theo sở thích.
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
      <div className="plan_collection">
        <div className="section_header">
          <h3 className="section_name">Lịch trình được tạo gần đây</h3>
          <div className="plan-collection-action">
            <a href="/login">Tất cả</a>
          </div>
        </div>
        {/* plan-colection */}
        <div className="plan-collection-body">
          <div className="plan-collection-item">
            <a className="plan_card">
              <img src={plan_img} className="plan_img_css" />
              <p className="plan_day">4 ngày</p>
            </a>
            <div className="plan_card_name">
              4 ngày đi Phú Quốc từ Hồ Chí Minh
            </div>
            <div className="plan_card_desc">
              <div className="left_card_desc">
                <img src={avatar} alt="user_img" />
                <div className="user_info">
                  <div className="user_name">Phước Nguyên</div>
                  <div className="plan-created">4 giờ trước</div>
                </div>
              </div>
              <div className="right_card_desc"> 500.000 đ</div>
            </div>
          </div>
          <div className="plan-collection-item">
            <a className="plan_card">
              <img src={plan_img} className="plan_img_css" />
              <p className="plan_day  ">4 ngày</p>
            </a>
            <div className="plan_card_name">
              4 ngày đi Phú Quốc từ Hồ Chí Minh
            </div>
            <div className="plan_card_desc">
              <div className="left_card_desc">
                <img src={avatar} alt="user_img" />
                <div className="user_info">
                  <div className="user_name">Phước Nguyên</div>
                  <div className="plan-created">4 giờ trước</div>
                </div>
              </div>
              <div className="right_card_desc"> 500.000 đ</div>
            </div>
          </div>
          <div className="plan-collection-item">
            <a className="plan_card">
              <img src={plan_img} className="plan_img_css" />
              <p className="plan_day  ">4 ngày</p>
            </a>
            <div className="plan_card_name">
              4 ngày đi Phú Quốc từ Hồ Chí Minh
            </div>
            <div className="plan_card_desc">
              <div className="left_card_desc">
                <img src={avatar} alt="user_img" />
                <div className="user_info">
                  <div className="user_name">Phước Nguyên</div>
                  <div className="plan-created">4 giờ trước</div>
                </div>
              </div>
              <div className="right_card_desc"> 500.000 đ</div>
            </div>
          </div>
          <div className="plan-collection-item">
            <a className="plan_card">
              <img src={plan_img} className="plan_img_css" />
              <p className="plan_day  ">4 ngày</p>
            </a>
            <div className="plan_card_name">
              4 ngày đi Phú Quốc từ Hồ Chí Minh
            </div>
            <div className="plan_card_desc">
              <div className="left_card_desc">
                <img src={avatar} alt="user_img" />
                <div className="user_info">
                  <div className="user_name">Phước Nguyên</div>
                  <div className="plan-created">4 giờ trước</div>
                </div>
              </div>
              <div className="right_card_desc"> 500.000 đ</div>
            </div>
          </div>
        </div>
      </div>
      <div className="list_collection">
        <section className="places_section">
          <div className="section_header">
            <h3 className="section_name">Điểm đến phổ biến</h3>
            <div className="plan-collection-action">
              <a href="/login">Tất cả</a>
            </div>
          </div>
          <div className="section_body">
            <div className="card_place">
              <div className="card_play_img">
                <a href="/login" className="place_card_img">
                  <img src={bali_place} alt="Thiên đường nhiệt đới" />
                </a>
              </div>
              <div className="card_place_info">
                <a href="/login" className="info_name">
                  Bali
                </a>
                <span className="info_desc">Thiên đường nhiệt đới</span>
              </div>
            </div>
            <div className="card_place">
              <div className="card_play_img">
                <a href="/login">
                  <img src={bali_place} alt="Thiên đường nhiệt đới" />
                </a>
              </div>
              <div className="card_place_info">
                <a href="/login" className="info_name">
                  Bali
                </a>
                <span className="info_desc">Thiên đường nhiệt đới</span>
              </div>
            </div>
            <div className="card_place">
              <div className="card_play_img">
                <a href="/login">
                  <img src={bali_place} alt="Thiên đường nhiệt đới" />
                </a>
              </div>
              <div className="card_place_info">
                <a href="/login" className="info_name">
                  Bali
                </a>
                <span className="info_desc">Thiên đường nhiệt đới</span>
              </div>
            </div>
            <div className="card_place">
              <div className="card_play_img">
                <a href="/login">
                  <img src={bali_place} alt="Thiên đường nhiệt đới" />
                </a>
              </div>
              <div className="card_place_info">
                <a href="/login" className="info_name">
                  Bali
                </a>
                <span className="info_desc">Thiên đường nhiệt đới</span>
              </div>
            </div>
          </div>
        </section>
        <section className="combo_section">
          <div className="section_header">
            <h3 className="section_name">Top combo GIÁ TỐT</h3>
            <div className="plan-collection-action">
              <a href="/login">Tất cả</a>
            </div>
          </div>
          <div className="plan-collection-body">
            <div className="plan-collection-item">
              <a className="plan_card">
                <img src={plan_img} className="plan_img_css" />
                <p className="plan_day">4 ngày</p>
              </a>
              <div className="plan_card_name">
                4 ngày đi Phú Quốc từ Hồ Chí Minh
              </div>
              <div className="plan_card_desc">
                <div className="left_card_desc">
                  <img src={avatar} alt="user_img" />
                  <div className="user_info">
                    <div className="user_name">Phước Nguyên</div>
                    <div className="plan-created">4 giờ trước</div>
                  </div>
                </div>
                <div className="right_card_desc"> 500.000 đ</div>
              </div>
            </div>
            <div className="plan-collection-item">
              <a className="plan_card">
                <img src={plan_img} className="plan_img_css" />
                <p className="plan_day  ">4 ngày</p>
              </a>
              <div className="plan_card_name">
                4 ngày đi Phú Quốc từ Hồ Chí Minh
              </div>
              <div className="plan_card_desc">
                <div className="left_card_desc">
                  <img src={avatar} alt="user_img" />
                  <div className="user_info">
                    <div className="user_name">Phước Nguyên</div>
                    <div className="plan-created">4 giờ trước</div>
                  </div>
                </div>
                <div className="right_card_desc"> 500.000 đ</div>
              </div>
            </div>
            <div className="plan-collection-item">
              <a className="plan_card">
                <img src={plan_img} className="plan_img_css" />
                <p className="plan_day  ">4 ngày</p>
              </a>
              <div className="plan_card_name">
                4 ngày đi Phú Quốc từ Hồ Chí Minh
              </div>
              <div className="plan_card_desc">
                <div className="left_card_desc">
                  <img src={avatar} alt="user_img" />
                  <div className="user_info">
                    <div className="user_name">Phước Nguyên</div>
                    <div className="plan-created">4 giờ trước</div>
                  </div>
                </div>
                <div className="right_card_desc"> 500.000 đ</div>
              </div>
            </div>
            <div className="plan-collection-item">
              <a className="plan_card">
                <img src={plan_img} className="plan_img_css" />
                <p className="plan_day  ">4 ngày</p>
              </a>
              <div className="plan_card_name">
                4 ngày đi Phú Quốc từ Hồ Chí Minh
              </div>
              <div className="plan_card_desc">
                <div className="left_card_desc">
                  <img src={avatar} alt="user_img" />
                  <div className="user_info">
                    <div className="user_name">Phước Nguyên</div>
                    <div className="plan-created">4 giờ trước</div>
                  </div>
                </div>
                <div className="right_card_desc"> 50.000.000 đ</div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="value_smatra">
        <div className="value_container">
          <h4>Cá nhân hóa lịch trình - Tự do trải nghiệm</h4>
          <p>
            Để mỗi chuyến du lịch tự túc là một trải nghiệm trọn vẹn, Smatra
            giúp bạn lên kế hoạch chi tiết và phù hợp với sở thích cá nhân. Với
            chức năng lên lịch trình tự động, hay sao chép và chỉnh sửa lịch
            trình của du khách khác, bạn có thể tiết kiệm đến 90% thời gian.
            Tăng thêm trải nghiệm và sự hài lòng cho chuyến đi với các tính năng
            hỗ trợ như lưu địa điểm yêu thích, xem thời tiết, mời bạn bè cùng
            tham gia chuyến đi và tương tác với nhau.
          </p>
          <h4>Tiết kiệm chi phí</h4>
          <p>
            Smatra giúp bạn săn vé máy bay, khách sạn, vé tham quan, hoạt động
            tại điểm đến,... với giá ưu đãi tốt nhất từ các đối tác hàng đầu
            trong và ngoài nước
          </p>
        </div>
      </div>
      <div />
    </div>
  );
};

export default ListService;
