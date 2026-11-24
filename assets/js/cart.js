// ====================================================================================================
// TẬP TIN: cart.js
// DỰ ÁN: Website Cửa hàng Mắt kính An Phát (Môn Nhập môn Lập trình Web)
// MỤC ĐÍCH: Xử lý toàn bộ logic nghiệp vụ và tương tác giao diện trên trang giỏ hàng (cart.html)
// ====================================================================================================

/**
 * HÀM 1: showcart()
 * - Nhiệm vụ: Đọc dữ liệu mảng sản phẩm giỏ hàng từ localStorage và render bảng chi tiết bằng DOM thuần.
 * - Tham số: Không có.
 * - Cơ chế: Chỉ gọi 1 lần khi trang được nạp ban đầu.
 */
function showcart() {
    // 1. Lấy chuỗi JSON giỏ hàng từ localStorage thông qua key 'cart' và parse thành mảng Object JavaScript
    let gioHangHienTai = JSON.parse(localStorage.getItem('cart'));

    // 2. Kiểm tra nếu giỏ hàng chưa từng tồn tại (null) hoặc mảng rỗng (length === 0)
    if (gioHangHienTai == null || gioHangHienTai.length === 0) {
        // Thông báo popup cho người dùng biết giỏ hàng đang trống
        alert("Giỏ hàng hiện tại đang trống.");
        // Kết thúc hàm ngay lập tức, không thực thi các lệnh tạo bảng bên dưới
        return;
    }

    // 3. Lấy tham chiếu đến 3 thẻ chính của bảng từ file cart.html:
    const tlhead = document.querySelector('.list-head'); // Thẻ <thead> chứa hàng tiêu đề cột
    const tlbody = document.querySelector('.list-body'); // Thẻ <tbody> chứa các hàng sản phẩm
    const tlfooter = document.querySelector('.list-foot'); // Thẻ <tfoot> chứa các hàng tổng kết tiền

    // 4. Tạo thẻ dòng <tr> cho tiêu đề bảng
    const trhead = document.createElement('tr');

    // 5. Khai báo mảng tên các cột cần hiển thị trên bảng giỏ hàng
    const dsCot = ['STT', 'Hình ảnh', 'Tên sản phẩm', 'Số lượng', 'Thành tiền', 'Xóa'];

    // 6. Lặp qua từng tên cột trong mảng để tạo các ô tiêu đề <th>
    dsCot.forEach(tungCot => {
        // Tạo thẻ <th> mới
        const th = document.createElement('th');
        // Gán văn bản tên cột vào nội dung thẻ <th>
        th.textContent = tungCot;
        // Thêm thẻ <th> vào dòng tiêu đề trhead
        trhead.appendChild(th);
    });

    // 7. Gắn dòng tiêu đề hoàn chỉnh vào phần thead (tlhead) của bảng
    tlhead.appendChild(trhead);

    // 8. Khởi tạo biến 'tong' tích lũy tổng số tiền và biến 'so' đếm số thứ tự bắt đầu từ 0
    let tong = 0, so = 0;

    // 9. Duyệt qua từng sản phẩm 'i' được lưu trong giỏ hàng để tạo dòng dữ liệu tương ứng trong tbody
    gioHangHienTai.forEach(i => {
        // Tính thành tiền của món hàng thứ i = số lượng (i.sl) * đơn giá (i.price)
        const thanhTien = i.sl * i.price;
        // Cộng dồn thành tiền của món hàng này vào tổng tiền chung của cả giỏ hàng
        tong += thanhTien;

        // Tạo thẻ dòng <tr> đại diện cho một sản phẩm trong giỏ hàng
        const tr = document.createElement('tr');

        // --- CỘT 1: SỐ THỨ TỰ (STT) ---
        // Tạo thẻ <td> cho cột STT
        const tdso = document.createElement('td');
        // Tăng biến 'so' lên 1 và gán vào nội dung text của ô
        tdso.textContent = ++so;
        // Gắn ô STT vào dòng tr
        tr.appendChild(tdso);

        // --- CỘT 2: HÌNH ẢNH SẢN PHẨM ---
        // Tạo thẻ <td> cho cột hình ảnh
        const tdHA = document.createElement('td');
        // Tạo thẻ <img> để hiển thị ảnh sản phẩm
        const img = document.createElement('img');
        // Gán đường dẫn file ảnh của sản phẩm vào thuộc tính src
        img.src = i.image;
        // Gán tên sản phẩm vào thuộc tính alt (hiển thị khi ảnh bị lỗi)
        img.alt = i.name;
        // Thêm class 'cart-img' để định dạng kích thước ảnh theo file cart.css
        img.classList.add('cart-img');
        // Gắn thẻ <img> vào trong thẻ <td>
        tdHA.appendChild(img);
        // Gắn thẻ <td> hình ảnh vào dòng tr
        tr.appendChild(tdHA);

        // --- CỘT 3: TÊN SẢN PHẨM ---
        // Tạo thẻ <td> cho cột tên sản phẩm
        const tdten = document.createElement('td');
        // Gán tên sản phẩm vào nội dung ô
        tdten.textContent = i.name;
        // Gắn thẻ <td> tên sản phẩm vào dòng tr
        tr.appendChild(tdten);

        // --- CỘT 4: SỐ LƯỢNG KÈM NÚT TĂNG/GIẢM (+/-) ---
        // Tạo thẻ <td> chứa khối điều khiển số lượng
        const tdsl = document.createElement('td');
        // Tạo thẻ <div> bọc nút trừ, số lượng, nút cộng để căn chỉnh layout (flexbox)
        const divqsl = document.createElement('div');
        // Gán class 'qlsl' (quản lý số lượng) theo stylesheet
        divqsl.classList.add('qlsl');

        // Tạo thẻ <span> để hiển thị số lượng sản phẩm hiện tại
        const sl = document.createElement('span');
        // Gán số lượng hiện tại của sản phẩm vào thẻ <span>
        sl.textContent = i.sl;

        // --- CỘT 5: THÀNH TIỀN CỦA SẢN PHẨM ---
        // Tạo trước thẻ <td> thành tiền để có thể truyền tham chiếu vào hàm doiSoLuong()
        const tdTien = document.createElement('td');
        // Định dạng số tiền sang chuẩn Việt Nam (VD: 250000 -> 250.000đ)
        tdTien.textContent = thanhTien.toLocaleString('vi-VN') + 'đ';

        // Tạo nút Giảm (-)
        const nutTru = document.createElement('button');
        // Đặt kiểu button để tránh việc tự động submit form
        nutTru.type = 'button';
        // Hiển thị ký tự dấu trừ trên mặt nút
        nutTru.textContent = '-';
        // Bắt sự kiện onclick khi bấm nút trừ: gọi hàm doiSoLuong với bước nhảy là -1
        nutTru.onclick = function () {
            doiSoLuong(i.id, -1, sl, tdTien);
        };

        // Tạo nút Tăng (+)
        const nutCong = document.createElement('button');
        // Đặt kiểu button
        nutCong.type = 'button';
        // Hiển thị ký tự dấu cộng trên mặt nút
        nutCong.textContent = '+';
        // Bắt sự kiện onclick khi bấm nút cộng: gọi hàm doiSoLuong với bước nhảy là +1
        nutCong.onclick = function () {
            doiSoLuong(i.id, 1, sl, tdTien);
        };

        // Gắn nút trừ (-) vào div quản lý số lượng
        divqsl.appendChild(nutTru);
        // Gắn thẻ span hiển thị số lượng vào div
        divqsl.appendChild(sl);
        // Gắn nút cộng (+) vào div quản lý số lượng
        divqsl.appendChild(nutCong);
        // Gắn div quản lý số lượng vào thẻ <td>
        tdsl.appendChild(divqsl);
        // Gắn thẻ <td> số lượng vào dòng tr
        tr.appendChild(tdsl);

        // Gắn thẻ <td> thành tiền vào dòng tr
        tr.appendChild(tdTien);

        // --- CỘT 6: NÚT XÓA SẢN PHẨM ---
        // Tạo thẻ <td> cho cột xóa
        const tdDele = document.createElement('td');
        // Tạo thẻ <button> để bấm xóa sản phẩm
        const Dele = document.createElement('button');
        // Thêm class 'btn-dele' để áp dụng màu sắc và kiểu dáng nút xóa từ CSS
        Dele.classList.add('btn-dele');
        // Đặt kiểu button
        Dele.type = 'button';
        // Hiển thị chữ 'Xóa' trên mặt nút
        Dele.textContent = 'Xóa';
        // Bắt sự kiện onclick khi bấm xóa: gọi hàm xoaSanPham truyền vào ID sản phẩm và dòng tr hiện tại
        Dele.onclick = function () {
            xoaSanPham(i.id, tr);
        };
        // Gắn nút xóa vào trong thẻ <td>
        tdDele.appendChild(Dele);
        // Gắn thẻ <td> xóa vào dòng tr
        tr.appendChild(tdDele);

        // Thêm toàn bộ dòng tr sản phẩm vừa tạo vào phần thân bảng <tbody> (tlbody)
        tlbody.appendChild(tr);
    });

    // 10. Xây dựng phần tfoot (chân bảng) gồm 3 dòng: Tổng cộng, VAT (10%), và Thành tiền cuối cùng

    // --- DÒNG 1 TFOOT: TỔNG CỘNG CHƯA THUẾ ---
    // Tạo thẻ dòng <tr> mới cho hàng tổng cộng
    const tr = document.createElement('tr');

    // Tạo ô tiêu đề 'Tổng cộng:'
    const td1 = document.createElement('td');
    // Gộp 4 cột đầu tiên lại với nhau (STT, Hình ảnh, Tên sản phẩm, Số lượng)
    td1.colSpan = 4;
    // Thêm class định kiểu nhãn tổng tiền
    td1.classList.add('total-label');
    // Gán nội dung nhãn
    td1.textContent = 'Tổng cộng:';

    // Tạo ô giá trị tổng tiền
    const td2 = document.createElement('td');
    // Gán ID 'tongCong' để hàm capNhatTongTien() có thể truy vấn và cập nhật giá trị mới khi số lượng đổi
    td2.id = 'tongCong';
    // Thêm class định kiểu giá trị tổng tiền
    td2.classList.add('total-value');
    // Gán số tiền tổng cộng định dạng tiền Việt Nam
    td2.textContent = tong.toLocaleString('vi-VN') + 'đ';

    // Tạo ô trống ở cột xóa để giữ giao diện bảng vuông vức
    const td3 = document.createElement('td');
    // Gộp 3 dòng theo chiều dọc (chiếm vị trí của cả 3 dòng tổng kết ở cột Xóa)
    td3.rowSpan = 3;

    // Gắn lần lượt 3 ô vào dòng tr tổng cộng
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    // Gắn dòng tr tổng cộng vào phần chân bảng (tlfooter)
    tlfooter.appendChild(tr);

    // Tính thuế giá trị gia tăng VAT = 10% của tổng tiền (làm tròn xuống số nguyên)
    const thueVAT = Math.floor(tong * 0.1);
    // Tính tổng số tiền thực tế khách cần thanh toán = Tổng tiền + Thuế VAT
    const tongThanhToan = tong + thueVAT;

    // --- DÒNG 2 TFOOT: THUẾ VAT (10%) ---
    // Tạo thẻ dòng <tr> cho hàng thuế VAT
    const trThue = document.createElement('tr');

    // Tạo ô nhãn 'VAT (10%):'
    const tdThueLabel = document.createElement('td');
    // Gộp 4 cột đầu
    tdThueLabel.colSpan = 4;
    // Thêm class nhãn
    tdThueLabel.classList.add('total-label');
    // Gán văn bản nhãn
    tdThueLabel.textContent = 'VAT (10%):';

    // Tạo ô giá trị tiền thuế VAT
    const tdThueValue = document.createElement('td');
    // Gán ID 'thueVAT' để hàm capNhatTongTien() tìm thấy và cập nhật sau này
    tdThueValue.id = 'thueVAT';
    // Thêm class giá trị
    tdThueValue.classList.add('total-value');
    // Gán giá trị tiền thuế VAT định dạng tiền Việt Nam
    tdThueValue.textContent = thueVAT.toLocaleString('vi-VN') + 'đ';

    // Gắn ô nhãn và ô giá trị vào dòng tr thuế
    trThue.appendChild(tdThueLabel);
    trThue.appendChild(tdThueValue);
    // Gắn dòng tr thuế vào phần chân bảng (tlfooter)
    tlfooter.appendChild(trThue);

    // --- DÒNG 3 TFOOT: THÀNH TIỀN TỔNG THANH TOÁN ---
    // Tạo thẻ dòng <tr> cho hàng thành tiền cuối cùng
    const trThanhTien = document.createElement('tr');

    // Tạo ô nhãn 'Thành tiền:'
    const tdThanhTienLabel = document.createElement('td');
    // Gộp 4 cột đầu
    tdThanhTienLabel.colSpan = 4;
    // Thêm class nhãn
    tdThanhTienLabel.classList.add('total-label');
    // Gán văn bản nhãn
    tdThanhTienLabel.textContent = 'Thành tiền:';

    // Tạo ô giá trị tổng thanh toán cuối cùng
    const tdThanhTienValue = document.createElement('td');
    // Gán ID 'tongThanhToan' để hàm capNhatTongTien() tìm thấy và cập nhật sau này
    tdThanhTienValue.id = 'tongThanhToan';
    // Thêm class giá trị
    tdThanhTienValue.classList.add('total-value');
    // Gán giá trị tổng tiền thanh toán định dạng tiền Việt Nam
    tdThanhTienValue.textContent = tongThanhToan.toLocaleString('vi-VN') + 'đ';

    // Gắn ô nhãn và ô giá trị vào dòng tr thành tiền
    trThanhTien.appendChild(tdThanhTienLabel);
    trThanhTien.appendChild(tdThanhTienValue);
    // Gắn dòng tr thành tiền vào phần chân bảng (tlfooter)
    tlfooter.appendChild(trThanhTien);
}

/**
 * HÀM 2: capNhatTongTien()
 * - Nhiệm vụ: Tính toán lại tổng tiền từ dữ liệu localStorage mới nhất và chỉ cập nhật đúng 3 ô text ở footer.
 * - Mục đích: Tránh việc phải tải lại trang (location.reload) hoặc render lại cả bảng gây nháy màn hình.
 * - Tham số: Không có.
 */
function capNhatTongTien() {
    // 1. Lấy dữ liệu giỏ hàng mới nhất từ localStorage (nếu không có thì mặc định là mảng rỗng [])
    const gioHangHienTai = JSON.parse(localStorage.getItem('cart')) || [];
    // 2. Khởi tạo biến lưu tổng tiền tạm tính bắt đầu từ 0
    let tong = 0;

    // 3. Duyệt mảng giỏ hàng để cộng dồn tiền = số lượng * đơn giá của từng món
    gioHangHienTai.forEach(item => {
        tong += item.sl * item.price;
    });

    // 4. Tính lại thuế VAT 10%
    const thueVAT = Math.floor(tong * 0.1);
    // 5. Tính lại tổng thanh toán sau thuế
    const tongThanhToan = tong + thueVAT;

    // 6. Cập nhật trực tiếp chuỗi văn bản mới vào ô Tổng cộng thông qua ID #tongCong
    document.querySelector('#tongCong').textContent = tong.toLocaleString('vi-VN') + 'đ';
    // 7. Cập nhật trực tiếp chuỗi văn bản mới vào ô Thuế VAT thông qua ID #thueVAT
    document.querySelector('#thueVAT').textContent = thueVAT.toLocaleString('vi-VN') + 'đ';
    // 8. Cập nhật trực tiếp chuỗi văn bản mới vào ô Thành tiền thông qua ID #tongThanhToan
    document.querySelector('#tongThanhToan').textContent = tongThanhToan.toLocaleString('vi-VN') + 'đ';

    // 9. Gọi hàm capNhatSoGioHang() (từ main.js) để đồng bộ lại badge số lượng trên icon giỏ hàng ở header
    capNhatSoGioHang();
}

/**
 * HÀM 3: doiSoLuong(idSanPham, thayDoi, slEl, tdTienEl)
 * - Nhiệm vụ: Xử lý tăng hoặc giảm số lượng của 1 món hàng khi người dùng bấm nút '+' hoặc '-'.
 * - Tham số:
 *     + idSanPham: ID định danh của sản phẩm cần thay đổi số lượng.
 *     + thayDoi: Giá trị thay đổi (+1 nếu bấm '+', -1 nếu bấm '-').
 *     + slEl: Tham chiếu đến thẻ <span> hiển thị số lượng của dòng đó trên giao diện DOM.
 *     + tdTienEl: Tham chiếu đến thẻ <td> hiển thị thành tiền của dòng đó trên giao diện DOM.
 */
function doiSoLuong(idSanPham, thayDoi, slEl, tdTienEl) {
    // 1. Lấy dữ liệu giỏ hàng hiện tại từ localStorage
    let gioHangHienTai = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. Duyệt qua từng sản phẩm trong mảng để tìm đúng sản phẩm có id trùng khớp
    gioHangHienTai.forEach(item => {
        // Kiểm tra nếu id của món hàng khớp với idSanPham truyền vào
        if (item.id === idSanPham) {
            // Điều kiện an toàn: Số lượng sau khi thay đổi phải >= 1 (không cho phép giảm xuống 0 hoặc số âm)
            if (item.sl + thayDoi >= 1) {
                // Tăng hoặc giảm số lượng trong mảng dữ liệu
                item.sl += thayDoi;
                // Cập nhật lại số lượng hiển thị trên thẻ span của giao diện người dùng
                slEl.textContent = item.sl;
                // Cập nhật lại ô thành tiền của riêng món này trên giao diện người dùng
                tdTienEl.textContent = (item.sl * item.price).toLocaleString('vi-VN') + 'đ';
            }
        }
    });

    // 3. Chuyển mảng dữ liệu đã cập nhật thành chuỗi JSON và lưu lại vào localStorage
    localStorage.setItem('cart', JSON.stringify(gioHangHienTai));

    // 4. Gọi hàm capNhatTongTien() để tính lại và hiển thị các con số tổng tiền ở footer
    capNhatTongTien();
}

/**
 * HÀM 4: xoaSanPham(idSanPham, trEl)
 * - Nhiệm vụ: Xóa một sản phẩm ra khỏi giỏ hàng, xóa dòng tương ứng trên giao diện và đánh lại STT.
 * - Tham số:
 *     + idSanPham: ID định danh của sản phẩm cần xóa.
 *     + trEl: Tham chiếu trực tiếp đến thẻ dòng <tr> của sản phẩm đó trên bảng DOM.
 */
function xoaSanPham(idSanPham, trEl) {
    // 1. Tạo một mảng mới rỗng để chứa các sản phẩm còn lại sau khi lọc
    let dsMoi = [];
    // 2. Lấy dữ liệu giỏ hàng hiện tại từ localStorage
    let gioHangHienTai = JSON.parse(localStorage.getItem('cart')) || [];

    // 3. Duyệt qua tất cả sản phẩm: nếu sản phẩm có ID khác với idSanPham cần xóa thì giữ lại (push vào mảng mới)
    gioHangHienTai.forEach(item => {
        if (item.id !== idSanPham) {
            dsMoi.push(item);
        }
    });

    // 4. Lưu danh sách mới đã loại bỏ sản phẩm cần xóa vào localStorage
    localStorage.setItem('cart', JSON.stringify(dsMoi));

    // 5. Gỡ bỏ trực tiếp thẻ dòng <tr> của sản phẩm này khỏi cấu trúc DOM của trang
    trEl.remove();

    // 6. Kiểm tra nếu sau khi xóa mà giỏ hàng trở nên trống hoàn toàn (độ dài mảng = 0)
    if (dsMoi.length === 0) {
        // Xóa trắng nội dung trong thead
        document.querySelector('.list-head').textContent = '';
        // Xóa trắng nội dung trong tbody
        document.querySelector('.list-body').textContent = '';
        // Xóa trắng nội dung trong tfoot
        document.querySelector('.list-foot').textContent = '';
        // Cập nhật lại số lượng hàng trên header về số 0
        capNhatSoGioHang();
        // Bật popup thông báo giỏ hàng hiện tại đang trống
        alert("Giỏ hàng hiện tại đang trống.");
        // Kết thúc hàm
        return;
    }

    // 7. Nếu trong giỏ hàng vẫn còn sản phẩm: Tìm tất cả các thẻ <tr> còn lại trong tbody
    const cacDong = document.querySelectorAll('.list-body tr');
    // 8. Duyệt qua từng dòng còn lại kèm theo chỉ số index (0, 1, 2...)
    cacDong.forEach((dong, idx) => {
        // Cột con đầu tiên (children[0]) chính là cột STT -> cập nhật lại STT liên tục bắt đầu từ 1 (idx + 1)
        dong.children[0].textContent = idx + 1;
    });

    // 9. Cập nhật lại cụm tổng tiền, VAT và thành tiền ở footer theo giỏ hàng mới
    capNhatTongTien();
}

// ====================================================================================================
// KHỐI 5: XỬ LÝ SỰ KIỆN KHI BẤM NÚT ĐẶT HÀNG (#btnOrder)
// ====================================================================================================
// 1. Tìm phần tử nút đặt hàng trên trang theo ID #btnOrder
const nutDatHang = document.querySelector('#btnOrder');

// 2. Kiểm tra nếu nút đặt hàng tồn tại trên giao diện thì mới gắn sự kiện
if (nutDatHang) {
    // 3. Gắn lắng nghe sự kiện click chuột vào nút đặt hàng
    nutDatHang.addEventListener('click', function () {
        // Lấy thông tin tài khoản đang đăng nhập từ localStorage với key 'account'
        const account = JSON.parse(localStorage.getItem('account'));

        // Kiểm tra điều kiện 1: Chưa đăng nhập (account là null hoặc trạng thái isLoggedIn không phải là true)
        if (account == null || account.isLoggedIn !== true) {
            // Thông báo người dùng cần đăng nhập trước
            alert('Vui lòng đăng nhập để đặt hàng!');
            // Điều hướng trình duyệt chuyển sang trang đăng nhập login.html
            location.href = 'login.html';
            // Dừng xử lý
            return;
        }

        // Lấy dữ liệu giỏ hàng hiện tại từ localStorage
        const gioHang = JSON.parse(localStorage.getItem('cart')) || [];

        // Kiểm tra điều kiện 2: Giỏ hàng không có sản phẩm nào (length === 0)
        if (gioHang.length === 0) {
            // Thông báo yêu cầu người dùng chọn sản phẩm trước khi đặt
            alert('Giỏ hàng của bạn đang trống, vui lòng chọn sản phẩm trước khi đặt hàng!');
            // Dừng xử lý
            return;
        }

        // Nếu vượt qua cả 2 điều kiện trên: Cho phép đặt hàng thành công
        alert('Đặt hàng thành công!');
        // Xóa sạch key 'cart' trong localStorage vì đơn hàng đã được đặt xong
        localStorage.removeItem('cart');
        // Điều hướng người dùng quay trở về trang chủ index.html
        location.href = 'index.html';
    });
}

// ====================================================================================================
// KHỐI 6: KHỞI ĐỘNG CHỨC NĂNG KHI VÀO TRANG
// ====================================================================================================
// Tự động gọi hàm showcart() ngay khi file cart.js được nạp để hiển thị giỏ hàng cho người dùng
showcart();
