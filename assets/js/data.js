const baseProducts = [{
    id: 1,
    name: "Gọng Kính Nam Molsion MA6006 B15",
    category: "gong-kinh",
    price: 2780000,
    imageUrl: "https://product.hstatic.net/200000689681/product/1_f2e6da39e2b34218a2c490a29f5cbbfb_master.jpg"
  },
  {
    id: 2,
    name: "Gọng Kính Nam Prada PR A12VD",
    category: "gong-kinh",
    price: 8500000,
    imageUrl: "https://product.hstatic.net/1000122386/product/pr_a12vd_1ab1o1___5136bdaf451046728e2d36927ee4e700.jpg"
  },
  {
    id: 3,
    name: "Gọng Kính Unisex Gucci GG1121O 001",
    category: "gong-kinh",
    price: 10500000,
    imageUrl: "https://cdn.hstatic.net/products/200000689681/1_5d6535830c7e4f31b0f0ba6f9669e50e_master.png"
  },
  {
    id: 4,
    name: "Gọng Kính Nam Ray-Ban RX5387 2000",
    category: "gong-kinh",
    price: 4200000,
    imageUrl: "https://product.hstatic.net/1000122386/product/rb5387f_2000__54cn__83460a3807594eec9f37dcf565f9ecb6.jpg"
  },
  {
    id: 5,
    name: "Gọng Kính Titanium Bolon BJ7081",
    category: "gong-kinh",
    price: 3500000,
    imageUrl: "https://cdn.matkinhtamduc.com/wp-content/uploads/2026/07/mat-kinh-bolon-augsburg-ba7081-b10.webp"
  },
  {
    id: 6,
    name: "Gọng Kính Nữ Cartier CT0281O",
    category: "gong-kinh",
    price: 25000000,
    imageUrl: "https://product.hstatic.net/1000122386/product/ct0281o-001___ct0281o-003__54x18x140mm___56x18x145mm__4124c9ec6c01479ea2b4e5e50e570a05_master.jpg"
  },
  {
    id: 7,
    name: "Gọng Kính Tròn Gentle Monster 9 PRO",
    category: "gong-kinh",
    price: 6800000,
    imageUrl: "https://gentlemonstervna.com/wp-content/uploads/2026/01/gentle-monster-noho-t9-300x300.webp"
  },
  {
    id: 8,
    name: "Gọng Kính Nam Montblanc MB0123O",
    category: "gong-kinh",
    price: 11200000,
    imageUrl: "https://product.hstatic.net/1000122386/product/mb0023o_003___mb0023o_006__57-18-145___59-18-150__3dbaa98cc6544f06886ef8f86253fc5d_master.jpg"
  },
  {
    id: 9,
    name: "Gọng Kính Thể Thao Oakley OX8156",
    category: "gong-kinh",
    price: 4800000,
    imageUrl: "https://hatoeyewear.com/wp-content/uploads/2024/09/0OX8156__81560sad1__P21__shad__qt.jpg"
  },
  {
    id: 10,
    name: "Gọng Kính Nhựa Acetate Burberry BE2345",
    category: "gong-kinh",
    price: 5600000,
    imageUrl: "https://hatoeyewear.com/wp-content/uploads/2024/09/0OX8156__81560sad1__P21__shad__qt.jpg"
  },
  {
    id: 11,
    name: "Kính Mát Unisex Gucci GG1523S 001",
    category: "kinh-mat",
    price: 12480000,
    imageUrl: "https://cdn.hstatic.net/products/200000689681/1_b95d26ecfede4f37a04f84f738d80c3f_grande.png"
  },
  {
    id: 12,
    name: "Kính Mát Nữ Prada 0PR24ZSF",
    category: "kinh-mat",
    price: 10380000,
    imageUrl: "https://product.hstatic.net/200000689681/product/1_c5a9aea90f69497aabf9a5bcc0a962a8.png"
  },
  {
    id: 13,
    name: "Kính Mát Nam Montblanc MB0488SA",
    category: "kinh-mat",
    price: 10680000,
    imageUrl: "https://cdn.hstatic.net/products/200000689681/1_50e0002884424c9ca4107a14adf4a1f1_grande.png"
  },
  {
    id: 14,
    name: "Kính Mát Nữ AMO AMO62614 C2",
    category: "kinh-mat",
    price: 480000,
    imageUrl: "https://cdn.hstatic.net/products/200000689681/a53614_c2.cs_42b6866d180a433bad0edbabaf8e8039_grande.png"
  },
  {
    id: 15,
    name: "Kính Mát Unisex Bolon BL3267 C10",
    category: "kinh-mat",
    price: 4080000,
    imageUrl: "https://cdn.hstatic.net/products/200000689681/1_fb5ccbf4c7bf40ef9418de75fe2300d0_grande.jpg"
  },
  {
    id: 16,
    name: "Kính Mát Ray-Ban Aviator Classic",
    category: "kinh-mat",
    price: 5200000,
    imageUrl: "https://cdn.hstatic.net/products/1000122386/rb3025_181_fb5f1b7bca324da99de7b1d0e2cce979.jpg"
  },
  {
    id: 17,
    name: "Kính Mát Gentle Monster Lilit 01",
    category: "kinh-mat",
    price: 7200000,
    imageUrl: "https://dl.pew.vn/photo/2021/11/08/gentle-monster-lilit-01.jpg?v=1636344366"
  },
  {
    id: 18,
    name: "Kính Mát Nữ Dior Pacific S1U",
    category: "kinh-mat",
    price: 14500000,
    imageUrl: "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/12/kinh-mat-dior-diorpacific-s1u-10a0-mau-den-656ee0aa9481f-05122023153450.jpg"
  },
  {
    id: 19,
    name: "Kính Mát Thể Thao Oakley Radar EV",
    category: "kinh-mat",
    price: 6100000,
    imageUrl: "https://oakleyvietnam.vn/wp-content/uploads/2016/06/mat-kinh-the-thao-Oakley-OO9275-10_radar-ev_polished-01-scaled.jpg"
  },
  {
    id: 20,
    name: "Kính Mát Nam Cartier CT0034S",
    category: "kinh-mat",
    price: 32000000,
    imageUrl: "https://product.hstatic.net/1000122386/product/ct0034s-013-_-ct0034s-014_302ca318eea9493a8d2cf835fee83dea.jpg"
  },
  {
    id: 21,
    name: "Tròng kính BlueUV Capture Max AZ",
    category: "trong-kinh",
    price: 1500000,
    imageUrl: "https://cdn.hstatic.net/products/1000357311/liensonoptic_156_blueuv_capture_maxaz_af5193235bbb4020a5465b8f64c68f72_0dfd16b7fcfb401ebffc3a96be2d2989_master.webp"
  },
  {
    id: 22,
    name: "Tròng kính Eyezen Transitions Gen8",
    category: "trong-kinh",
    price: 3350000,
    imageUrl: "https://product.hstatic.net/1000122386/product/eyezen_start_max_az_gen_8_xam_khoi_1.59_airwear_5ed430541df24b3e8c9831b38d791a3e_master.jpg"
  },
  {
    id: 23,
    name: "Tròng kính Myopilux Plus - Kiểm soát cận thị",
    category: "trong-kinh",
    price: 2200000,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbnXD3ENTFUDyQ93CXrNE2OmvegK-Q4sGm2Cap1l8303Nh2mBtxz3-t-c&s=10"
  },
  {
    id: 24,
    name: "Tròng Kính Đổi Màu Zeiss PhotoFusion",
    category: "trong-kinh",
    price: 4500000,
    imageUrl: "https://cdn.matkinhtamduc.com/wp-content/uploads/2023/09/trong-kinh-zeiss-photofusion-x-2.jpg"
  },
  {
    id: 25,
    name: "Tròng Kính Chống Chói Zeiss DriveSafe",
    category: "trong-kinh",
    price: 5800000,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZb6jzjQX39KFm197s0bPrW-TVxYnZQ-JIaUnKTZdbZRRpc04Kydc4rOI&s=10"
  },
  {
    id: 26,
    name: "Tròng Kính Siêu Mỏng Chemi 1.74",
    category: "trong-kinh",
    price: 1200000,
    imageUrl: "https://cdn.matkinhtamduc.com/wp-content/uploads/2017/11/trong-kinh-chemi-crystal-u2-coated-1-74-2.jpg"
  },
  {
    id: 27,
    name: "Tròng Kính Lọc Ánh Sáng Xanh Chemi U6",
    category: "trong-kinh",
    price: 850000,
    imageUrl: "https://kinhmateyeplus.com/wp-content/uploads/2024/11/160-u6.png"
  },
  {
    id: 28,
    name: "Tròng Kính Hoya Nulux 1.67",
    category: "trong-kinh",
    price: 2100000,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4VLjS3Ii23fBpBl5auxKWOEfiZcpSl3RFwXQQtgV0yaBAz4pO_GKmnIwA&s=10"
  },
  {
    id: 29,
    name: "Tròng Kính Kodak Clean&CleAR",
    category: "trong-kinh",
    price: 950000,
    imageUrl: "https://matkinhhoangha.com/wp-content/uploads/kodak156.jpg"
  },
  {
    id: 30,
    name: "Tròng Kính Đa Tròng Element Varifocal",
    category: "trong-kinh",
    price: 3100000,
    imageUrl: "https://hatoeyewear.com/wp-content/uploads/2025/06/z6744840983952_36782c75db1958d464d3628248e57daf.jpg"
  }
];