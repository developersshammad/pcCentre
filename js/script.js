// assets/js/script.js
// Basic dynamic data and interactions for PC Centre demo site
$(function(){
  // Sample news / offers data
  const news = [
    {title:'Dell Mega Sale', text:'Flat 20% off on selected Dell laptops until Oct 15. Visit our dealers.'},
    {title:'RTX Upgrade Offer', text:'Trade-in your old GPU and get discount on new NVIDIA RTX models.'},
    {title:'Back-to-school Notebooks', text:'Special prices on student-friendly notebooks across brands.'}
  ];

  // Function to render news items on the home page
  function renderNews(){
    const $list = $('#news-list');
    $list.empty();
    news.forEach(n=>{
      const col = $('<div class="col-md-4"><div class="card p-3"><h5>'+n.title+'</h5><p>'+n.text+'</p></div></div>');
      $list.append(col);
    });
  }

  // Categories + subcategories structure
  const categories = [
    {id:'displays', title:'Displays', subs:['Monitors','Projectors']},
    {id:'boards', title:'Motherboards & Processors', subs:['Motherboards','Processors']},
    {id:'notebooks', title:'Notebooks', subs:['Ultrabook','Gaming','Business']},
    {id:'storage', title:'Storage', subs:['HDD','SSD','External']},
    {id:'memory', title:'Memory', subs:['DDR4','DDR5']},
    {id:'modems', title:'Modems', subs:['Routers','ADSL']},
    {id:'sound', title:'Sound', subs:['Speakers','Headphones']},
    {id:'input', title:'Mice / Keyboards', subs:['Gaming Mice','Keyboards']},
    {id:'printers', title:'Printers', subs:['Inkjet','Laser']},
    {id:'scanners', title:'Scanners', subs:['Flatbed','Document']},
    {id:'ups', title:'UPS', subs:['Home','Enterprise']},
    {id:'accessories', title:'Accessories', subs:['Cables','Adapters','Bags']}
  ];

  const sampleProducts = {
    'displays':[
      {id:'d1',title:'Samsung Curved 32"',price:'PKR 78,000',img:['img/Display/samsung1.jpg','img/Display/samsung2.jpg','img/Display/samsung3.jpg'],specs:{'Screen Size':'32" Curved','Resolution':'4K UHD','Refresh Rate':'60Hz','Panel Type':'VA','Connectivity':'HDMI, DisplayPort'},features:['Curved design for immersive viewing','4K resolution','HDR support','Slim bezels']},
      {id:'d2',title:'Dell 24" FHD',price:'PKR 25,000',img:['img/Display/dell1.jpg','img/Display/dell2.jpg','img/Display/dell3.jpg'],specs:{'Screen Size':'24"','Resolution':'1920x1080','Refresh Rate':'75Hz','Panel Type':'IPS','Connectivity':'HDMI, VGA'},features:['Full HD resolution','IPS panel for accurate colors','75Hz refresh rate','VESA mount compatible']},
      {id:'d3',title:'Acer 27" 4K',price:'PKR 55,000',img:['img/Display/acer1.jpg','img/Display/acer2.jpg','img/Display/acer3.jpg'],specs:{'Screen Size':'27"','Resolution':'3840x2160','Refresh Rate':'60Hz','Panel Type':'IPS','Connectivity':'HDMI, DisplayPort, USB-C'},features:['4K UHD resolution','USB-C with power delivery','IPS panel','Blue light filter']},
      {id:'d4',title:'HP 21.5" IPS',price:'PKR 30,000',img:['img/Display/hp1.jpg','img/Display/hp2.jpg','img/Display/hp3.jpg'],specs:{'Screen Size':'21.5"','Resolution':'1920x1080','Refresh Rate':'60Hz','Panel Type':'IPS','Connectivity':'HDMI, VGA'},features:['Full HD IPS display','Anti-glare coating','Energy efficient','Integrated speakers']},
      {id:'d5',title:'Asus 28" Ultrawide',price:'PKR 65,000',img:['img/Display/asus1.jpg','img/Display/asus2.jpg','img/Display/asus3.jpg'],specs:{'Screen Size':'28"','Resolution':'3840x1200','Refresh Rate':'60Hz','Panel Type':'IPS','Connectivity':'HDMI, DisplayPort'},features:['Ultrawide 21:9 aspect ratio','4K resolution','IPS panel','Ergonomic stand']},
      {id:'d6',title:'BenQ 24" Gaming',price:'PKR 35,000',img:['img/Display/benq1.jpg','img/Display/benq2.jpg','img/Display/benq3.jpg'],specs:{'Screen Size':'24"','Resolution':'1920x1080','Refresh Rate':'144Hz','Panel Type':'TN','Connectivity':'HDMI, DisplayPort'},features:['144Hz refresh rate','1ms response time','AMD FreeSync','Gaming optimized']},
      {id:'d7',title:'LG 32" 144Hz',price:'PKR 85,000',img:['img/Display/lg1.jpg','img/Display/lg2.jpg','img/Display/lg3.jpg'],specs:{'Screen Size':'32"','Resolution':'2560x1440','Refresh Rate':'144Hz','Panel Type':'IPS','Connectivity':'HDMI, DisplayPort'},features:['QHD resolution','144Hz refresh rate','IPS panel','HDR10 support']},
      {id:'d8',title:'ViewSonic 22" LED',price:'PKR 20,000',img:['img/Display/viewsonic1.jpg','img/Display/viewsonic2.jpg','img/Display/viewsonic3.jpg'],specs:{'Screen Size':'22"','Resolution':'1920x1080','Refresh Rate':'60Hz','Panel Type':'TN','Connectivity':'HDMI, VGA'},features:['Full HD LED display','Eco mode','Wall mountable','Integrated speakers']},
      {id:'d9',title:'Philips 27" Curved',price:'PKR 50,000',img:['img/Display/philips1.jpg','img/Display/philips2.jpg','img/Display/philips3.jpg'],specs:{'Screen Size':'27" Curved','Resolution':'2560x1440','Refresh Rate':'75Hz','Panel Type':'VA','Connectivity':'HDMI, DisplayPort'},features:['Curved QHD display','75Hz refresh rate','VA panel','Flicker-free technology']}
    ],
    'boards':[
      {id:'b1',title:'Asus Prime B450',price:'PKR 25,000',img:['img/motherboard and processor/asus1.jpg','img/motherboard and processor/asus2.jpg','img/motherboard and processor/asus3.jpg'],specs:{'Socket':'AM4','Chipset':'B450','RAM Support':'DDR4 up to 4400MHz','PCIe Slots':'2x PCIe 3.0 x16','USB Ports':'6x USB 3.1'},features:['AM4 socket for Ryzen processors','DDR4 RAM support','Multiple PCIe slots','USB 3.1 Gen 1 ports']},
      {id:'b2',title:'Gigabyte B550 Aorus',price:'PKR 35,000',img:['img/motherboard and processor/gigabyte1.jpg','img/motherboard and processor/gigabyte2.jpg','img/motherboard and processor/gigabyte3.jpg'],specs:{'Socket':'AM4','Chipset':'B550','RAM Support':'DDR4 up to 4400MHz','PCIe Slots':'2x PCIe 4.0 x16','USB Ports':'8x USB 3.2'},features:['PCIe 4.0 support','High-speed DDR4 RAM','RGB lighting','Wi-Fi 6 ready']},
      {id:'b3',title:'MSI MAG B660',price:'PKR 28,000',img:['img/motherboard and processor/msi1.jpg','img/motherboard and processor/msi2.jpg','img/motherboard and processor/msi3.jpg'],specs:{'Socket':'LGA 1700','Chipset':'B660','RAM Support':'DDR4 up to 4800MHz','PCIe Slots':'2x PCIe 5.0 x16','USB Ports':'6x USB 3.2'},features:['12th Gen Intel support','DDR4 RAM','PCIe 5.0','Military-grade components']},
      {id:'b4',title:'ASRock H610',price:'PKR 18,000',img:['img/motherboard and processor/asrock1.jpg','img/motherboard and processor/asrock2.jpg','img/motherboard and processor/asrock3.jpg'],specs:{'Socket':'LGA 1700','Chipset':'H610','RAM Support':'DDR4 up to 3200MHz','PCIe Slots':'1x PCIe 4.0 x16','USB Ports':'4x USB 3.2'},features:['12th Gen Intel ready','DDR4 support','Compact design','Integrated graphics ready']},
      {id:'b5',title:'Biostar A520',price:'PKR 15,000',img:['img/motherboard and processor/biostar1.jpg','img/motherboard and processor/biostar2.jpg','img/motherboard and processor/biostar3.jpg'],specs:{'Socket':'AM4','Chipset':'A520','RAM Support':'DDR4 up to 4400MHz','PCIe Slots':'1x PCIe 3.0 x16','USB Ports':'4x USB 3.2'},features:['AMD Ryzen support','DDR4 RAM','Cost-effective','Easy overclocking']},
      {id:'b6',title:'Foxconn H81',price:'PKR 12,000',img:['img/motherboard and processor/foxconn1.jpg','img/motherboard and processor/foxconn2.jpg','img/motherboard and processor/foxconn3.jpg'],specs:{'Socket':'LGA 1150','Chipset':'H81','RAM Support':'DDR3 up to 1600MHz','PCIe Slots':'1x PCIe 2.0 x16','USB Ports':'6x USB 2.0'},features:['4th Gen Intel support','DDR3 RAM','Stable performance','Budget-friendly']},
      {id:'b7',title:'Supermicro X11',price:'PKR 45,000',img:['img/motherboard and processor/supermicro1.jpg','img/motherboard and processor/supermicro2.jpg','img/motherboard and processor/supermicro3.jpg'],specs:{'Socket':'LGA 3647','Chipset':'C621','RAM Support':'DDR4 up to 2933MHz','PCIe Slots':'7x PCIe 3.0','USB Ports':'4x USB 3.1'},features:['Xeon Scalable support','ECC RAM','IPMI 2.0','Server-grade reliability']},
      {id:'b8',title:'ECS H110',price:'PKR 10,000',img:['img/motherboard and processor/ecs1.jpg','img/motherboard and processor/ecs2.jpg','img/motherboard and processor/ecs3.jpg'],specs:{'Socket':'LGA 1151','Chipset':'H110','RAM Support':'DDR4 up to 2133MHz','PCIe Slots':'1x PCIe 3.0 x16','USB Ports':'4x USB 3.0'},features:['6th/7th Gen Intel','DDR4 support','Compact ATX','Integrated graphics']},
      {id:'b9',title:'Intel D54250WYK',price:'PKR 40,000',img:['img/motherboard and processor/intel1.jpg','img/motherboard and processor/intel2.jpg','img/motherboard and processor/intel3.jpg'],specs:{'Socket':'LGA 1150','Chipset':'Q87','RAM Support':'DDR3 up to 1600MHz','PCIe Slots':'2x PCIe 2.0 x16','USB Ports':'8x USB 2.0'},features:['4th Gen Intel Xeon','DDR3 ECC RAM','Dual LAN','VPro support']}
    ],
    'notebooks':[
      {id:'n1',title:'HP Pavilion 14',price:'PKR 95,000',img:['img/notebooks/HP Pavilion 1.jpg','img/notebooks/HP Pavilion 2.jpg','img/notebooks/HP Pavilion 3.jpg'],specs:{'Processor':'AMD Ryzen 5 5500U','RAM':'8GB DDR4','Storage':'512GB SSD','Display':'14" FHD','Graphics':'Integrated Radeon'},features:['AMD Ryzen processor','Full HD display','Long battery life','Lightweight design']},
      {id:'n2',title:'Dell Inspiron 15',price:'PKR 145,000',img:['img/notebooks/Dell Inspiron 1.jpg','img/notebooks/Dell Inspiron 2.jpg','img/notebooks/Dell Inspiron 3.jpg'],specs:{'Processor':'Intel Core i5-1135G7','RAM':'8GB DDR4','Storage':'512GB NVMe SSD','Display':'15.6" FHD','Graphics':'Intel Iris Xe'},features:['Intel Core i5','8GB RAM','512GB SSD','1 year warranty']},
      {id:'n3',title:'Lenovo ThinkPad X1',price:'PKR 200,000',img:['img/notebooks/Lenovo ThinkPad 1.jpg','img/notebooks/Lenovo ThinkPad 2.jpg','img/notebooks/Lenovo ThinkPad 3.jpg'],specs:{'Processor':'Intel Core i7-1165G7','RAM':'16GB LPDDR4X','Storage':'1TB SSD','Display':'13.3" FHD+','Graphics':'Intel Iris Xe'},features:['Business-grade durability','High-resolution display','Thunderbolt 4','MIL-STD-810H certified']},
      {id:'n4',title:'Asus ROG Strix',price:'PKR 180,000',img:['img/notebooks/Asus ROG Strix 1.jpg','img/notebooks/Asus ROG Strix 3.jpg','img/notebooks/Asus ROG Strix 3.jpg'],specs:{'Processor':'Intel Core i7-11800H','RAM':'16GB DDR4','Storage':'1TB NVMe SSD','Display':'15.6" FHD 144Hz','Graphics':'NVIDIA RTX 3060'},features:['Gaming performance','144Hz display','RGB keyboard','Advanced cooling']},
      {id:'n5',title:'Acer Swift 5',price:'PKR 120,000',img:['img/notebooks/Acer Swift 1.jpg','img/notebooks/Acer Swift 2.jpg','img/notebooks/Acer Swift 3.jpg'],specs:{'Processor':'Intel Core i5-1135G7','RAM':'8GB LPDDR4X','Storage':'512GB SSD','Display':'14" FHD','Graphics':'Intel Iris Xe'},features:['Ultra-thin design','All-metal chassis','Fingerprint reader','USB-C charging']},
      {id:'n6',title:'HP Envy 13',price:'PKR 110,000',img:['img/notebooks/hp envy 1.jpg','img/notebooks/HP Envy 2.jpg','img/notebooks/HP Envy 3.jpg'],specs:{'Processor':'AMD Ryzen 5 5500U','RAM':'8GB DDR4','Storage':'256GB SSD','Display':'13.3" FHD','Graphics':'Integrated Radeon'},features:['Premium design','HP Sure Click','Bang & Olufsen audio','HP Sure Start']},
      {id:'n7',title:'Dell XPS 13',price:'PKR 160,000',img:['img/notebooks/Dell XPS 1.jpg','img/notebooks/Dell XPS 2.jpg','img/notebooks/Dell XPS 3.jpg'],specs:{'Processor':'Intel Core i7-1165G7','RAM':'16GB LPDDR4X','Storage':'512GB SSD','Display':'13.4" FHD+','Graphics':'Intel Iris Xe'},features:['InfinityEdge display','Aluminum chassis','ExpressCharge','Killer Wi-Fi']},
      {id:'n8',title:'Lenovo Yoga 9i',price:'PKR 190,000',img:['img/notebooks/Lenovo Yoga 9i 1.jpg','img/notebooks/Lenovo Yoga 9i 2.jpg','img/notebooks/Lenovo Yoga 9i 3.jpg'],specs:{'Processor':'Intel Core i7-1185G7','RAM':'16GB LPDDR4X','Storage':'1TB SSD','Display':'14" 4K OLED','Graphics':'Intel Iris Xe'},features:['2-in-1 convertible','4K OLED display','Dolby Vision','Rapid Charge']},
      {id:'n9',title:'Asus ZenBook 14',price:'PKR 130,000',img:['img/notebooks/Asus ZenBook 1.jpg','img/notebooks/Asus ZenBook 2.jpg','img/notebooks/Asus ZenBook 3.jpg'],specs:{'Processor':'AMD Ryzen 7 5700U','RAM':'16GB DDR4','Storage':'512GB SSD','Display':'14" FHD','Graphics':'Integrated Radeon'},features:['Zen design','Ergonomic keyboard','Harman Kardon audio','Military-grade durability']}
    ],
    'storage':[
      {id:'s1',title:'Samsung 1TB SSD',price:'PKR 15,000',img:['img/Storage/samsung1.png','img/Storage/samsung2.png','img/Storage/samsung3.png'],specs:{'Capacity':'1TB','Type':'SATA SSD','Read Speed':'550MB/s','Write Speed':'520MB/s','Form Factor':'2.5"','Warranty':'3 years'},features:['SATA III interface','High-speed performance','Reliable storage','Energy efficient']},
      {id:'s2',title:'WD 2TB HDD',price:'PKR 8,000',img:['img/Storage/WD 2TB (1).png','img/Storage/WD 2TB (2).png','img/Storage/WD 2TB (3).png'],specs:{'Capacity':'2TB','Type':'HDD','RPM':'5400','Cache':'64MB','Interface':'SATA III','Warranty':'2 years'},features:['Large capacity','Cost-effective','Quiet operation','Stable performance']},
      {id:'s3',title:'Seagate 4TB External',price:'PKR 12,000',img:['img/Storage/seagate (1).png','img/Storage/seagate (2).png','img/Storage/seagate (3).png'],specs:{'Capacity':'4TB','Type':'External HDD','RPM':'5400','Interface':'USB 3.0','Dimensions':'4.6 x 3.2 x 0.8 inches','Warranty':'2 years'},features:['Portable design','USB powered','Plug and play','Backup software included']},
      {id:'s4',title:'Kingston 500GB SSD',price:'PKR 10,000',img:['img/Storage/Kingston (1).png','img/Storage/Kingston (2).png','img/Storage/Kingston (3).png'],specs:{'Capacity':'500GB','Type':'SATA SSD','Read Speed':'500MB/s','Write Speed':'450MB/s','Form Factor':'2.5"','Warranty':'3 years'},features:['Fast boot times','Shock resistant','Low power consumption','Reliable Kingston quality']},
      {id:'s5',title:'Toshiba 1TB HDD',price:'PKR 6,000',img:['img/Storage/toshiba (1).png','img/Storage/toshiba (2).png','img/Storage/toshiba (3).png'],specs:{'Capacity':'1TB','Type':'HDD','RPM':'5400','Cache':'8MB','Interface':'SATA III','Warranty':'1 year'},features:['Budget-friendly','Stable performance','Low noise','Energy saving']},
      {id:'s6',title:'Crucial 2TB NVMe',price:'PKR 20,000',img:['img/Storage/crucial (1).png','img/Storage/crucial (2).png','img/Storage/crucial (3).png'],specs:{'Capacity':'2TB','Type':'NVMe SSD','Read Speed':'3400MB/s','Write Speed':'3000MB/s','Form Factor':'M.2','Warranty':'5 years'},features:['PCIe Gen3','High-speed NVMe','Micron 3D NAND','Advanced error correction']},
      {id:'s7',title:'WD My Passport 1TB',price:'PKR 9,000',img:['img/Storage/WD 1TB (1).png','img/Storage/WD 1TB (2).png','img/Storage/WD 1TB (3).png'],specs:{'Capacity':'1TB','Type':'External HDD','RPM':'5400','Interface':'USB 3.0','Dimensions':'4.3 x 3.0 x 0.6 inches','Warranty':'3 years'},features:['Automatic backup','Password protection','Compact size','WD Discovery software']},
      {id:'s8',title:'Samsung T7 500GB',price:'PKR 11,000',img:['img/Storage/sam500gb(1).png','img/Storage/sam500gb(2).png','img/Storage/sam500gb(3).png'],specs:{'Capacity':'500GB','Type':'External SSD','Read Speed':'1050MB/s','Write Speed':'1000MB/s','Interface':'USB 3.2','Warranty':'3 years'},features:['SuperSpeed USB','Rugged design','AES 256-bit encryption','Fast data transfer']},
      {id:'s9',title:'HGST 8TB HDD',price:'PKR 25,000',img:['img/Storage/HGST (1).png','img/Storage/HGST (2).png','img/Storage/HGST (3).png'],specs:{'Capacity':'8TB','Type':'HDD','RPM':'7200','Cache':'128MB','Interface':'SATA III','Warranty':'5 years'},features:['Enterprise-grade','High capacity','Reliable HGST quality','24/7 operation']}
    ],
    'memory':[
      {id:'m1',title:'Corsair 16GB DDR4',price:'PKR 12,000',img:['img/memory/corsair1.jpg','img/memory/corsair2.jpg','img/memory/corsair3.jpg'],specs:{'Capacity':'16GB (2x8GB)','Type':'DDR4','Speed':'3200MHz','CAS Latency':'16','Voltage':'1.35V','Warranty':'Lifetime'},features:['XMP 2.0 support','Aluminum heatspreader','Low voltage','High performance']},
      {id:'m2',title:'G.Skill 32GB DDR5',price:'PKR 25,000',img:['img/memory/G.Skil1.jpg','img/memory/G.Skil2.jpg','img/memory/G.Skil3.jpg'],specs:{'Capacity':'32GB (2x16GB)','Type':'DDR5','Speed':'5200MHz','CAS Latency':'38','Voltage':'1.25V','Warranty':'Lifetime'},features:['DDR5 technology','High-speed performance','Low power consumption','RGB lighting']},
      {id:'m3',title:'Kingston 8GB DDR4',price:'PKR 6,000',img:['img/memory/Kingston1.jpg','img/memory/Kingston2.jpg','img/memory/Kingston3.jpg'],specs:{'Capacity':'8GB','Type':'DDR4','Speed':'2666MHz','CAS Latency':'19','Voltage':'1.2V','Warranty':'Lifetime'},features:['JEDEC standard','Auto-overclocking','Reliable Kingston quality','Cost-effective']},
      {id:'m4',title:'Crucial 16GB DDR4',price:'PKR 10,000',img:['img/memory/crucial1.jpg','img/memory/Crucial2.jpg','img/memory/Crucial3.jpg'],specs:{'Capacity':'16GB','Type':'DDR4','Speed':'3200MHz','CAS Latency':'22','Voltage':'1.2V','Warranty':'Lifetime'},features:['Micron technology','High compatibility','Low profile','Energy efficient']},
      {id:'m5',title:'HyperX 32GB DDR4',price:'PKR 18,000',img:['img/memory/HyperX1.jpg','img/memory/HyperX2.jpg','img/memory/HyperX3.jpg'],specs:{'Capacity':'32GB (2x16GB)','Type':'DDR4','Speed':'3200MHz','CAS Latency':'16','Voltage':'1.35V','Warranty':'Lifetime'},features:['Fury series','Aluminum heatspreader','Plug N Play','Gaming optimized']},
      {id:'m6',title:'ADATA 64GB DDR4',price:'PKR 35,000',img:['img/memory/adata1.jpg','img/memory/adata2.jpg','img/memory/ADATA3.jpg'],specs:{'Capacity':'64GB (4x16GB)','Type':'DDR4','Speed':'3200MHz','CAS Latency':'16','Voltage':'1.35V','Warranty':'Lifetime'},features:['High capacity','XMP ready','Heat dissipation','Professional use']},
      {id:'m7',title:'TeamGroup 16GB DDR5',price:'PKR 15,000',img:['img/memory/TeamGroup1.jpg','img/memory/TeamGroup2.jpg','img/memory/TeamGroup3.jpg'],specs:{'Capacity':'16GB','Type':'DDR5','Speed':'4800MHz','CAS Latency':'40','Voltage':'1.1V','Warranty':'Lifetime'},features:['DDR5 standard','High bandwidth','Low latency','Future-proof']},
      {id:'m8',title:'Patriot 8GB DDR3',price:'PKR 5,000',img:['img/memory/Patriot1.jpg','img/memory/Patriot2.jpg','img/memory/Patriot3.jpg'],specs:{'Capacity':'8GB','Type':'DDR3','Speed':'1600MHz','CAS Latency':'11','Voltage':'1.5V','Warranty':'Lifetime'},features:['Legacy support','Stable performance','Budget-friendly','Wide compatibility']},
      {id:'m9',title:'Viper 32GB DDR4',price:'PKR 20,000',img:['img/memory/Viper 1.jpg','img/memory/Viper 2.jpg','img/memory/Viper 3.jpg'],specs:{'Capacity':'32GB (2x16GB)','Type':'DDR4','Speed':'3600MHz','CAS Latency':'18','Voltage':'1.35V','Warranty':'Lifetime'},features:['Patriot Viper series','High-speed DDR4','RGB lighting','Gaming performance']}
    ],
    'modems':[
      {id:'mod1',title:'TP-Link Archer C6',price:'PKR 8,000',img:['img/modems/archer1.jpg','img/modems/archer2.jpg','img/modems/archer3.jpg'],specs:{'Wi-Fi Standard':'AC1200','Bands':'2.4GHz + 5GHz','Ports':'4x LAN, 1x WAN','Antennas':'4','Security':'WPA3','Warranty':'3 years'},features:['Dual-band Wi-Fi','MU-MIMO technology','Easy setup','Parental controls']},
      {id:'mod2',title:'D-Link DIR-615',price:'PKR 5,000',img:['img/modems/dir1.jpg','img/modems/dir2.jpg','img/modems/dir3.jpg'],specs:{'Wi-Fi Standard':'N300','Bands':'2.4GHz','Ports':'4x LAN, 1x WAN','Antennas':'2','Security':'WPA2','Warranty':'1 year'},features:['Wireless N technology','Compact design','Web-based setup','Energy efficient']},
      {id:'mod3',title:'Netgear Nighthawk',price:'PKR 15,000',img:['img/modems/Netgear1.jpg','img/modems/Netgear2.jpg','img/modems/Netgear3.jpg'],specs:{'Wi-Fi Standard':'AX3000','Bands':'2.4GHz + 5GHz','Ports':'4x LAN, 1x WAN','Antennas':'4','Security':'WPA3','Warranty':'2 years'},features:['Wi-Fi 6 ready','High-speed internet','Advanced security','Smart home integration']},
      {id:'mod4',title:'Asus RT-AX55',price:'PKR 12,000',img:['img/modems/asus1.jpg','img/modems/asus2.jpg','img/modems/asus3.jpg'],specs:{'Wi-Fi Standard':'AX1800','Bands':'2.4GHz + 5GHz','Ports':'4x LAN, 1x WAN','Antennas':'4','Security':'WPA3','Warranty':'2 years'},features:['AiProtection Pro','Adaptive QoS','VPN support','Gaming optimization']},
      {id:'mod5',title:'Huawei B315',price:'PKR 7,000',img:['img/modems/huawei 1.jpg','img/modems/huawei 2.jpg','img/modems/huawei 3.jpg'],specs:{'Wi-Fi Standard':'AC650','Bands':'2.4GHz + 5GHz','Ports':'2x LAN, 1x WAN','Antennas':'2','Security':'WPA2','Warranty':'1 year'},features:['LTE modem','4G connectivity','Battery backup','Mobile hotspot']},
      {id:'mod6',title:'Linksys EA6350',price:'PKR 10,000',img:['img/modems/Linksys1.jpg','img/modems/Linksys2.jpg','img/modems/Linksys3.jpg'],specs:{'Wi-Fi Standard':'AC1200','Bands':'2.4GHz + 5GHz','Ports':'4x LAN, 1x WAN','Antennas':'4','Security':'WPA2','Warranty':'1 year'},features:['Smart Wi-Fi','Guest network','USB port','EasyLink app']},
      {id:'mod7',title:'MikroTik hAP ac',price:'PKR 18,000',img:['img/modems/MikroTik1.jpg','img/modems/MikroTik2.jpg','img/modems/MikroTik3.jpg'],specs:{'Wi-Fi Standard':'AC1200','Bands':'2.4GHz + 5GHz','Ports':'5x LAN, 1x WAN','Antennas':'2','Security':'WPA2','Warranty':'1 year'},features:['RouterOS','PoE support','SFP port','Professional features']},
      {id:'mod8',title:'Tenda AC10',price:'PKR 6,000',img:['img/modems/Tenda1.jpg','img/modems/Tenda2.jpg','img/modems/Tenda3.jpg'],specs:{'Wi-Fi Standard':'AC1200','Bands':'2.4GHz + 5GHz','Ports':'4x LAN, 1x WAN','Antennas':'4','Security':'WPA2','Warranty':'3 years'},features:['Beamforming technology','Smart app control','IPTV support','High gain antennas']},
      {id:'mod9',title:'Belkin F9K1002',price:'PKR 9,000',img:['img/modems/Belkin1.jpg','img/modems/Belkin2.jpg','img/modems/Belkin3.jpg'],specs:{'Wi-Fi Standard':'AC1200','Bands':'2.4GHz + 5GHz','Ports':'4x LAN, 1x WAN','Antennas':'4','Security':'WPA2','Warranty':'2 years'},features:['Self-healing Wi-Fi','Guest access','Parental controls','Multi-beam technology']}
    ],
    'sound':[
      {id:'snd1',title:'Logitech Z313',price:'PKR 4,000',img:['img/sound/Logitech1.jpg','img/sound/Logitech2.jpg','img/sound/Logitech3.jpg'],specs:{'Type':'2.1 Speaker System','Power':'25W RMS','Connectivity':'3.5mm','Frequency Response':'55Hz-20kHz','Drivers':'4" + 2x3"','Warranty':'1 year'},features:['Surround sound','Subwoofer included','Multiple inputs','Compact design']},
      {id:'snd2',title:'Sony WH-1000XM4',price:'PKR 25,000',img:['img/sound/Sony1.jpg','img/sound/Sony2.jpg','img/sound/Sony3.jpg'],specs:{'Type':'Wireless Headphones','Driver':'30mm','Battery Life':'30 hours','Connectivity':'Bluetooth 5.0','Noise Cancellation':'Active','Warranty':'1 year'},features:['Industry-leading ANC','30-hour battery','Quick charge','Touch controls']},
      {id:'snd3',title:'JBL GO 3',price:'PKR 3,000',img:['img/sound/JBL1.jpg','img/sound/JBL2.jpg','img/sound/JBL3.jpg'],specs:{'Type':'Portable Speaker','Power':'3W','Battery Life':'5 hours','Connectivity':'Bluetooth','Water Resistance':'IPX7','Warranty':'1 year'},features:['Wireless Bluetooth','Waterproof','Built-in mic','Compact and portable']},
      {id:'snd4',title:'Bose QuietComfort',price:'PKR 30,000',img:['img/sound/Bose 1.jpg','img/sound/Bose 2.jpg','img/sound/Bose 3.jpg'],specs:{'Type':'Wireless Headphones','Driver':'40mm','Battery Life':'24 hours','Connectivity':'Bluetooth','Noise Cancellation':'Active','Warranty':'1 year'},features:['World-class noise cancellation','Comfortable fit','Alexa/Google Assistant','Wireless charging']},
      {id:'snd5',title:'Sennheiser HD 2.30',price:'PKR 8,000',img:['img/sound/Sennheiser1.jpg','img/sound/Sennheiser2.jpg','img/sound/Sennheiser3.jpg'],specs:{'Type':'Wired Headphones','Driver':'32mm','Connectivity':'3.5mm','Frequency Response':'18Hz-22kHz','Impedance':'32 ohm','Warranty':'2 years'},features:['Open-back design','Foldable','Single-sided cable','Professional audio']},
      {id:'snd6',title:'Anker Soundcore',price:'PKR 5,000',img:['img/sound/Anker 1.jpg','img/sound/Anker 2.jpg','img/sound/Anker 3.jpg'],specs:{'Type':'Bluetooth Speaker','Power':'6W','Battery Life':'24 hours','Connectivity':'Bluetooth 5.0','Water Resistance':'IPX7','Warranty':'18 months'},features:['360° sound','24-hour battery','Waterproof','BassUp technology']},
      {id:'snd7',title:'Marshall Major II',price:'PKR 12,000',img:['img/sound/Marshall 1.jpg','img/sound/Marshall 2.jpg','img/sound/Marshall 3.jpg'],specs:{'Type':'Wired Headphones','Driver':'40mm','Connectivity':'3.5mm','Frequency Response':'20Hz-20kHz','Impedance':'38 ohm','Warranty':'1 year'},features:['Vintage design','Foldable','On-ear controls','Marshall sound quality']},
      {id:'snd8',title:'Audio-Technica ATH-S200BT',price:'PKR 7,000',img:['img/sound/Audio1.jpg','img/sound/Audio2.jpg','img/sound/Audio3.jpg'],specs:{'Type':'Wireless Headphones','Driver':'40mm','Battery Life':'40 hours','Connectivity':'Bluetooth','Foldable':'Yes','Warranty':'1 year'},features:['40-hour battery','Foldable design','Deep bass','Comfortable fit']},
      {id:'snd9',title:'Beats Solo3',price:'PKR 15,000',img:['img/sound/Beats1.jpg','img/sound/Beats2.jpg','img/sound/Beats3.jpg'],specs:{'Type':'Wireless Headphones','Driver':'40mm','Battery Life':'40 hours','Connectivity':'Bluetooth','Fast Fuel':'Yes','Warranty':'1 year'},features:['Pure ANC','Fast Fuel charging','Apple W1 chip','Premium materials']}
    ],
    'input':[
      {id:'inp1',title:'Logitech MX Master 3',price:'PKR 12,000',img:['img/mice&keyboards/Logitech1.jpg','img/mice&keyboards/Logitech2.jpg','img/mice&keyboards/Logitech3.jpg'],specs:{'Type':'Wireless Mouse','DPI':'4000','Buttons':'7','Battery Life':'70 days','Connectivity':'Bluetooth/USB','Sensor':'Darkfield','Warranty':'1 year'},features:['Multi-device support','Customizable buttons','Precise tracking','Ergonomic design']},
      {id:'inp2',title:'Razer DeathAdder',price:'PKR 8,000',img:['img/mice&keyboards/Razer1.jpg','img/mice&keyboards/Razer2.jpg','img/mice&keyboards/Razer3.jpg'],specs:{'Type':'Gaming Mouse','DPI':'10000','Buttons':'5','Sensor':'Optical','Connectivity':'USB','Weight':'96g','Warranty':'2 years'},features:['10000 DPI sensor','Razer Chroma RGB','Ergonomic shape','Programmable buttons']},
      {id:'inp3',title:'Corsair K57 RGB',price:'PKR 10,000',img:['img/mice&keyboards/Corsair1.jpg','img/mice&keyboards/Corsair2.jpg','img/mice&keyboards/Corsair3.jpg'],specs:{'Type':'Gaming Keyboard','Layout':'Tenkeyless','Switches':'Cherry MX Red','Backlight':'RGB','Connectivity':'USB','Warranty':'2 years'},features:['Cherry MX switches','Per-key RGB','Detachable palm rest','Multimedia keys']},
      {id:'inp4',title:'SteelSeries Rival 3',price:'PKR 6,000',img:['img/mice&keyboards/SteelSeries 1.jpg','img/mice&keyboards/SteelSeries 2.jpg','img/mice&keyboards/SteelSeries 3.jpg'],specs:{'Type':'Gaming Mouse','DPI':'8500','Buttons':'6','Sensor':'TrueMove Core','Connectivity':'USB','Weight':'77g','Warranty':'1 year'},features:['TrueMove Core sensor','RGB illumination','Split-trigger buttons','Lightweight design']},
      {id:'inp5',title:'Keychron K8',price:'PKR 15,000',img:['img/mice&keyboards/Keychron1.jpg','img/mice&keyboards/Keychron2.jpg','img/mice&keyboards/Keychron3.jpg'],specs:{'Type':'Wireless Keyboard','Layout':'75%','Switches':'Gateron','Battery Life':'240 hours','Connectivity':'Bluetooth/USB-C','Backlight':'RGB','Warranty':'1 year'},features:['Hot-swappable switches','Wireless/Bluetooth','RGB backlighting','Compact layout']},
      {id:'inp6',title:'Logitech G305',price:'PKR 5,000',img:['img/mice&keyboards/Logitech G305 1.jpg','img/mice&keyboards/Logitech G305 2.jpg','img/mice&keyboards/Logitech G305 3.jpg'],specs:{'Type':'Wireless Gaming Mouse','DPI':'12000','Buttons':'6','Battery Life':'250 hours','Connectivity':'USB','Sensor':'HERO','Warranty':'1 year'},features:['AA battery powered','Lightweight','HERO sensor','Gaming-grade performance']},
      {id:'inp7',title:'Razer BlackWidow',price:'PKR 18,000',img:['img/mice&keyboards/Razer BlackWidow 1.jpg','img/mice&keyboards/Razer BlackWidow 2.jpg','img/mice&keyboards/Razer BlackWidow 3.jpg'],specs:{'Type':'Gaming Keyboard','Layout':'Full-size','Switches':'Green','Backlight':'RGB','Connectivity':'USB','Warranty':'2 years'},features:['Tactile switches','Razer Chroma','Magnetic wrist rest','Anti-ghosting']},
      {id:'inp8',title:'HP Wired Mouse',price:'PKR 2,000',img:['img/mice&keyboards/HP 1.jpg','img/mice&keyboards/HP 2.jpg','img/mice&keyboards/HP 3.jpg'],specs:{'Type':'Wired Mouse','DPI':'1000','Buttons':'3','Connectivity':'USB','Sensor':'Optical','Weight':'90g','Warranty':'1 year'},features:['Optical sensor','Comfortable grip','Plug and play','Budget-friendly']},
      {id:'inp9',title:'Dell KM636',price:'PKR 4,000',img:['img/mice&keyboards/Dell 1.jpg','img/mice&keyboards/Dell 2.jpg','img/mice&keyboards/Dell 3.jpg'],specs:{'Type':'Wireless Combo','DPI':'1600','Keys':'104','Battery Life':'12 months','Connectivity':'USB','Sensor':'Optical','Warranty':'1 year'},features:['Wireless keyboard/mouse combo','Spill-resistant','Long battery life','Compact design']}
    ],
    'printers':[
      {id:'p1',title:'HP LaserJet Pro',price:'PKR 25,000',img:['img/printers/HP 1.jpg','img/printers/HP 2.jpg','img/printers/HP3.jpg'],specs:{'Type':'Laser Printer','Print Speed':'22 ppm','Resolution':'1200x1200 dpi','Connectivity':'USB/Wi-Fi','Paper Capacity':'150 sheets','Duplex':'Manual','Warranty':'1 year'},features:['Fast printing','Wireless connectivity','Energy efficient','Compact design']},
      {id:'p2',title:'Epson EcoTank',price:'PKR 30,000',img:['img/printers/Epson 1.jpg','img/printers/Epson 2.jpg','img/printers/Epson 3.jpg'],specs:{'Type':'Inkjet Printer','Print Speed':'15 ppm','Resolution':'5760x1440 dpi','Connectivity':'USB/Wi-Fi','Ink System':'Refillable tanks','Duplex':'Auto','Warranty':'1 year'},features:['Ultra-low cost per page','Refillable ink tanks','Borderless printing','Mobile printing']},
      {id:'p3',title:'Canon PIXMA',price:'PKR 15,000',img:['img/printers/Canon 1.jpg','img/printers/Canon 2.jpg','img/printers/Canon 3.jpg'],specs:{'Type':'Inkjet Printer','Print Speed':'12 ppm','Resolution':'4800x1200 dpi','Connectivity':'USB','Paper Capacity':'100 sheets','Duplex':'Manual','Warranty':'1 year'},features:['Photo printing','Wireless ready','Compact size','Easy setup']},
      {id:'p4',title:'Brother MFC-J1010DW',price:'PKR 20,000',img:['img/printers/Brother 1.jpg','img/printers/Brother 2.jpg','img/printers/Brother 3.jpg'],specs:{'Type':'All-in-One','Functions':'Print/Copy/Scan','Print Speed':'12 ppm','Resolution':'1200x6000 dpi','Connectivity':'USB/Wi-Fi','Duplex':'Manual','Warranty':'2 years'},features:['3-in-1 functionality','Wireless printing','Auto document feeder','Mobile app support']},
      {id:'p5',title:'Samsung Xpress',price:'PKR 18,000',img:['img/printers/Samsung 1.jpg','img/printers/Samsung 2.jpg','img/printers/Samsung 3.jpg'],specs:{'Type':'Laser Printer','Print Speed':'20 ppm','Resolution':'1200x1200 dpi','Connectivity':'USB','Paper Capacity':'150 sheets','Duplex':'Manual','Warranty':'1 year'},features:['Fast monochrome printing','Compact design','Low noise','Energy Star certified']},
      {id:'p6',title:'Ricoh SP 111',price:'PKR 12,000',img:['img/printers/Ricoh 1.jpg','img/printers/Ricoh 2.jpg','img/printers/Ricoh 3.jpg'],specs:{'Type':'Laser Printer','Print Speed':'22 ppm','Resolution':'1200x600 dpi','Connectivity':'USB','Paper Capacity':'150 sheets','Duplex':'Manual','Warranty':'1 year'},features:['High-speed printing','Low cost per page','Reliable performance','Easy maintenance']},
      {id:'p7',title:'Xerox Phaser 3020',price:'PKR 22,000',img:['img/printers/Xerox 1.jpg','img/printers/Xerox 2.jpg','img/printers/Xerox 3.jpg'],specs:{'Type':'Laser Printer','Print Speed':'20 ppm','Resolution':'1200x1200 dpi','Connectivity':'USB','Paper Capacity':'150 sheets','Duplex':'Manual','Warranty':'1 year'},features:['Color printing','Wireless ready','Automatic paper sensor','Eco-friendly toner']},
      {id:'p8',title:'Lexmark E260dn',price:'PKR 28,000',img:['img/printers/Lexmark 1.jpg','img/printers/Lexmark 2.jpg','img/printers/Lexmark 3.jpg'],specs:{'Type':'Laser Printer','Print Speed':'28 ppm','Resolution':'1200x1200 dpi','Connectivity':'USB/Ethernet','Paper Capacity':'250 sheets','Duplex':'Auto','Warranty':'1 year'},features:['Network printing','High capacity','Automatic duplex','Professional quality']},
      {id:'p9',title:'Kyocera ECOSYS',price:'PKR 35,000',img:['img/printers/Kyocera 1.jpg','img/printers/Kyocera 2.jpg','img/printers/Kyocera 3.jpg'],specs:{'Type':'Laser Printer','Print Speed':'25 ppm','Resolution':'1200x1200 dpi','Connectivity':'USB/Wi-Fi','Paper Capacity':'250 sheets','Duplex':'Auto','Warranty':'2 years'},features:['Long-life components','Low total cost','Eco-friendly','Advanced security']}
    ],
    'scanners':[
      {id:'sc1',title:'Epson Perfection V39',price:'PKR 15,000',img:['img/scanners/Epson 1.jpg','img/scanners/Epson 2.jpg','img/scanners/Epson 3.jpg'],specs:{'Type':'Flatbed Scanner','Resolution':'4800x4800 dpi','Scan Speed':'12 sec/page','Connectivity':'USB','Format':'A4','Bit Depth':'48-bit','Warranty':'1 year'},features:['High resolution','Film scanning','Easy setup','Compact design']},
      {id:'sc2',title:'Canon CanoScan',price:'PKR 12,000',img:['img/scanners/Canon 1.jpg','img/scanners/Canon 2.jpg','img/scanners/Canon 3.jpg'],specs:{'Type':'Flatbed Scanner','Resolution':'4800x9600 dpi','Scan Speed':'15 sec/page','Connectivity':'USB','Format':'A4','Bit Depth':'48-bit','Warranty':'1 year'},features:['High optical resolution','Auto document fix','Energy efficient','USB powered']},
      {id:'sc3',title:'HP ScanJet Pro',price:'PKR 20,000',img:['img/scanners/HP 1.jpg','img/scanners/HP 2.jpg','img/scanners/HP 3.jpg'],specs:{'Type':'Document Scanner','Resolution':'1200x1200 dpi','Scan Speed':'20 ppm','Connectivity':'USB/Ethernet','Format':'A4','Duplex':'Yes','Warranty':'1 year'},features:['Fast duplex scanning','Network connectivity','Automatic feeder','OCR software']},
      {id:'sc4',title:'Brother ADS-1700W',price:'PKR 25,000',img:['img/scanners/Brother 1.jpg','img/scanners/Brother 2.jpg','img/scanners/Brother 3.jpg'],specs:{'Type':'Document Scanner','Resolution':'1200x1200 dpi','Scan Speed':'25 ppm','Connectivity':'USB/Wi-Fi','Format':'A4','Duplex':'Yes','Warranty':'1 year'},features:['Wireless scanning','Mobile app support','Automatic feeder','Compact footprint']},
      {id:'sc5',title:'Fujitsu ScanSnap',price:'PKR 30,000',img:['img/scanners/Fujitsu 1.jpg','img/scanners/Fujitsu 2.jpg','img/scanners/Fujitsu  3.jpg'],specs:{'Type':'Document Scanner','Resolution':'600x600 dpi','Scan Speed':'25 ppm','Connectivity':'USB','Format':'A4','Duplex':'Yes','Warranty':'1 year'},features:['One-touch scanning','Intelligent features','Wi-Fi connectivity','Cloud integration']},
      {id:'sc6',title:'Plustek OpticBook',price:'PKR 18,000',img:['img/scanners/Plustek 1.jpg','img/scanners/Plustek 2.jpg','img/scanners/Plustek 3.jpg'],specs:{'Type':'Book Scanner','Resolution':'1200x1200 dpi','Scan Speed':'3 sec/page','Connectivity':'USB','Format':'A4','Book Edge':'Yes','Warranty':'1 year'},features:['Book scanning','Non-contact scanning','LED illumination','Easy operation']},
      {id:'sc7',title:'Kodak Alaris',price:'PKR 22,000',img:['img/scanners/Kodak 1.jpg','img/scanners/Kodak 2.jpg','img/scanners/Kodak 3.jpg'],specs:{'Type':'Document Scanner','Resolution':'600x600 dpi','Scan Speed':'30 ppm','Connectivity':'USB','Format':'A4','Duplex':'Yes','Warranty':'1 year'},features:['High-speed scanning','Reliable performance','Easy maintenance','Professional quality']},
      {id:'sc8',title:'Xerox DocuMate',price:'PKR 28,000',img:['img/scanners/Xerox  1.jpg','img/scanners/Xerox 2.jpg','img/scanners/Xerox 3.jpg'],specs:{'Type':'Document Scanner','Resolution':'600x600 dpi','Scan Speed':'25 ppm','Connectivity':'USB/Ethernet','Format':'A4','Duplex':'Yes','Warranty':'1 year'},features:['Network scanning','Advanced image processing','User-friendly interface','Durable design']},
      {id:'sc9',title:'Avision AD240',price:'PKR 16,000',img:['img/scanners/Avision 1.jpg','img/scanners/Avision 2.jpg','img/scanners/Avision 3.jpg'],specs:{'Type':'Document Scanner','Resolution':'600x600 dpi','Scan Speed':'20 ppm','Connectivity':'USB','Format':'A4','Duplex':'Yes','Warranty':'1 year'},features:['Automatic feeder','Duplex scanning','USB 2.0','Cost-effective']}
    ],
    'ups':[
      {id:'u1',title:'APC Back-UPS 600',price:'PKR 8,000',img:['img/ups/APC 1.jpg','img/ups/APC 2.jpg','img/ups/APC 3.jpg'],specs:{'Capacity':'600VA/330W','Type':'Line-interactive','Battery Type':'Sealed Lead Acid','Backup Time':'10 min','Outlets':'8','Transfer Time':'6ms','Warranty':'2 years'},features:['Surge protection','Battery backup','Automatic voltage regulation','LED indicators']},
      {id:'u2',title:'CyberPower CP685AVRG',price:'PKR 10,000',img:['img/ups/CyberPower 1.jpg','img/ups/CyberPower 2.jpg','img/ups/CyberPower 3.jpg'],specs:{'Capacity':'685VA/390W','Type':'Line-interactive','Battery Type':'Sealed Lead Acid','Backup Time':'8 min','Outlets':'8','Transfer Time':'4ms','Warranty':'3 years'},features:['GreenPower UPS','Automatic voltage regulation','Surge protection','Energy saving']},
      {id:'u3',title:'Tripp Lite AVR750U',price:'PKR 12,000',img:['img/ups/Tripp 1.jpg','img/ups/Tripp 2.jpg','img/ups/Tripp 3.jpg'],specs:{'Capacity':'750VA/450W','Type':'Line-interactive','Battery Type':'Sealed Lead Acid','Backup Time':'12 min','Outlets':'6','Transfer Time':'2ms','Warranty':'2 years'},features:['Automatic voltage regulation','Surge protection','USB charging port','Diagnostic LEDs']},
      {id:'u4',title:'Eaton 5P 650',price:'PKR 25,000',img:['img/ups/Eaton 1.jpg','img/ups/Eaton 2.jpg','img/ups/Eaton 3.jpg'],specs:{'Capacity':'650VA/400W','Type':'Line-interactive','Battery Type':'Sealed Lead Acid','Backup Time':'8 min','Outlets':'6','Transfer Time':'4ms','Warranty':'3 years'},features:['LCD display','Advanced battery management','Energy efficient','Compact design']},
      {id:'u5',title:'Schneider Electric',price:'PKR 20,000',img:['img/ups/Schneider 1.jpg','img/ups/Schneider 2.jpg','img/ups/Schneider3.jpg'],specs:{'Capacity':'1000VA/700W','Type':'Online','Battery Type':'Sealed Lead Acid','Backup Time':'10 min','Outlets':'6','Transfer Time':'0ms','Warranty':'2 years'},features:['Double conversion','Network management','Hot-swappable batteries','Advanced diagnostics']},
      {id:'u6',title:'Powercom BNT-600AP',price:'PKR 7,000',img:['img/ups/Powercom 1.jpg','img/ups/Powercom 2.jpg','img/ups/Powercom 3.jpg'],specs:{'Capacity':'600VA/360W','Type':'Line-interactive','Battery Type':'Sealed Lead Acid','Backup Time':'5 min','Outlets':'6','Transfer Time':'4ms','Warranty':'1 year'},features:['AVR technology','Overload protection','Wide input voltage','Auto restart']},
      {id:'u7',title:'FSP Fortron 500W',price:'PKR 6,000',img:['img/ups/FSP 1.jpg','img/ups/FSP 2.jpg','img/ups/FSP 3.jpg'],specs:{'Capacity':'500VA/300W','Type':'Standby','Battery Type':'Sealed Lead Acid','Backup Time':'3 min','Outlets':'4','Transfer Time':'6ms','Warranty':'1 year'},features:['Basic surge protection','Battery backup','Compact size','Cost-effective']},
      {id:'u8',title:'Mustek 1000VA',price:'PKR 15,000',img:['img/ups/Mustek 1.jpg','img/ups/Mustek 2.jpg','img/ups/Mustek 3.jpg'],specs:{'Capacity':'1000VA/600W','Type':'Line-interactive','Battery Type':'Sealed Lead Acid','Backup Time':'8 min','Outlets':'6','Transfer Time':'4ms','Warranty':'2 years'},features:['Microprocessor control','Boost and buck AVR','Cold start function','Data line protection']},
      {id:'u9',title:'Liebert GXT3',price:'PKR 30,000',img:['img/ups/Liebert 1.jpg','img/ups/Liebert 2.jpg','img/ups/Liebert 3.jpg'],specs:{'Capacity':'1000VA/900W','Type':'Online','Battery Type':'Sealed Lead Acid','Backup Time':'7 min','Outlets':'6','Transfer Time':'0ms','Warranty':'2 years'},features:['True online double conversion','Flexible rack/tower design','Advanced communications','Battery health monitoring']}
    ],
    'accessories':[
      {id:'a1',title:'Bluetooth Adapter',price:'PKR 3,000',img:['img/accessories/Bluetooth 1.jpg','img/accessories/Bluetooth 2.jpg','img/accessories/Bluetooth 3.jpg'],specs:{'Type':'Bluetooth 5.0 Adapter','Compatibility':'USB','Range':'10m','Power':'USB powered'},features:['Plug and play','High-speed transfer','Energy efficient']},
      {id:'a2',title:'Laptop Cooling Pad',price:'PKR 5,000',img:['img/accessories/Cooling 1.jpg','img/accessories/Cooling 2.jpg','img/accessories/Cooling 3.jpg'],specs:{'Type':'Cooling Pad','Fan Speed':'1200 RPM','Ports':'USB','Dimensions':'35x25cm','Power':'USB powered'},features:['Dual fans','Adjustable height','Quiet operation','USB pass-through']},
      {id:'a3',title:'External SSD',price:'PKR 10,000',img:['img/accessories/External 1.jpg','img/accessories/External 2.jpg','img/accessories/External 3.jpg'],specs:{'Capacity':'500GB','Type':'External SSD','Interface':'USB 3.0','Read Speed':'500MB/s','Write Speed':'450MB/s','Warranty':'3 years'},features:['Fast data transfer','Portable design','Shock resistant','Plug and play']},
      {id:'a4',title:'HDMI Cable',price:'PKR 2,000',img:['img/accessories/HDMI 1.jpg','img/accessories/HDMI 2.jpg','img/accessories/HDMI 3.jpg'],specs:{'Type':'HDMI Cable','Length':'2m','Version':'2.0','Resolution':'4K','Connector':'HDMI to HDMI','Gold Plated':'Yes'},features:['High-speed transmission','4K support','Gold-plated connectors','Durable construction']},
      {id:'a5',title:'Laptop Bag',price:'PKR 4,000',img:['img/accessories/Laptop 1.jpg','img/accessories/Laptop 2.jpg','img/accessories/Laptop 3.jpg'],specs:{'Type':'Laptop Bag','Compatibility':'Up to 15.6"','Material':'Nylon','Compartments':'2','Weight':'0.8kg','Color':'Black'},features:['Water-resistant','Padded interior','Multiple compartments','Comfortable strap']},
      {id:'a6',title:'Screen Protector',price:'PKR 1,500',img:['img/accessories/Screen 1.jpg','img/accessories/Screen 2.jpg','img/accessories/Screen 3.jpg'],specs:{'Type':'Tempered Glass','Compatibility':'Universal','Thickness':'0.3mm','Hardness':'9H','Oleophobic Coating':'Yes','Easy Install':'Yes'},features:['Scratch resistant','Bubble-free application','Anti-fingerprint','HD clarity']},
      {id:'a7',title:'USB Hub',price:'PKR 3,500',img:['img/accessories/USB 1.jpg','img/accessories/USB 2.jpg','img/accessories/USB 3.jpg'],specs:{'Type':'USB Hub','Ports':'4x USB 3.0','Power':'Bus powered','Compatibility':'USB 3.0','Dimensions':'10x5cm','LED Indicators':'Yes'},features:['Multiple USB ports','Fast charging','Compact design','Plug and play']},
      {id:'a8',title:'Webcam',price:'PKR 6,000',img:['img/accessories/Webcam 1.jpg','img/accessories/Webcam 2.jpg','img/accessories/Webcam 3.jpg'],specs:{'Type':'HD Webcam','Resolution':'1080p','Frame Rate':'30fps','Microphone':'Built-in','Interface':'USB','Auto Focus':'Yes'},features:['Full HD video','Built-in mic','Auto light correction','Easy setup']},
      {id:'a9',title:'Wireless Adapter',price:'PKR 4,000',img:['img/accessories/Wireless 1.jpg','img/accessories/Wireless 2.jpg','img/accessories/Wireless 3.jpg'],specs:{'Type':'Wi-Fi Adapter','Standard':'802.11ac','Speed':'1200Mbps','Antennas':'2','Interface':'USB','Security':'WPA3'},features:['High-speed Wi-Fi','Dual antennas','Easy installation','Broad compatibility']}
    ],
  };

  // Function to render category grid on products page
  function renderCategories(){
    const $grid = $('#categories-grid');
    if(!$grid.length) return;
    categories.forEach(cat=>{
      const col = $('<div class="col-md-3"><div class="card category-card p-3" data-id="'+cat.id+'"><h5>'+cat.title+'</h5><p class="small">'+cat.subs.join(' • ')+'</p></div></div>');
      $grid.append(col);
    });
  }

  function showCategoryProducts(catId){
    const $container = $('#category-products');
    $container.empty();
    const products = sampleProducts[catId] || [];
    if(products.length === 0){
      $container.append('<div class="alert alert-info">No products available in this category yet. Please check catalogue or try another category.</div>');
      return;
    }
    const row = $('<div class="row g-3"></div>');
    products.forEach(p=>{
      const imgSrc = Array.isArray(p.img) ? p.img[0] : p.img;
      let cardClass = 'product-card';
      if(catId === 'displays') cardClass += ' display-card';
      if(catId === 'boards') cardClass += ' board-card';
      if(catId === 'notebooks') cardClass += ' notebook-card';
      if(catId === 'storage') cardClass += ' storage-card';
      if(catId === 'memory') cardClass += ' memory-card';
      if(catId === 'sound') cardClass += ' sound-card';
      if(catId === 'input') cardClass += ' input-card';
      if(catId === 'printers') cardClass += ' printer-card';
      if(catId === 'scanners') cardClass += ' scanner-card';
      if(catId === 'ups') cardClass += ' ups-card';
      if(catId === 'accessories') cardClass += ' accessories-card';
      if(catId === 'modems') cardClass += ' modem-card';
      const col = $('<div class="col-md-4"><div class="card p-3 '+cardClass+'"><img src="'+imgSrc+'" alt="'+p.title+'" class="img-fluid mb-2"><h6>'+p.title+'</h6><p class="price-text">'+p.price+'</p><a href="product-detail.html?id='+p.id+'&cat='+catId+'" class="btn btn-main btn-sm">View</a></div></div>');
      row.append(col);
    });
    $container.append(row);
  }

  // Product detail interactions (thumb click)
  $('#thumbs').on('click', '.thumb', function(){
    const src = $(this).attr('src');
    $('#main-image').attr('src', src);
  });

  // Load product details based on URL parameter
  function loadProductDetail(){
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if(!productId) return;

    // Find product across all categories
    let product = null;
    for(const cat in sampleProducts){
      product = sampleProducts[cat].find(p => p.id === productId);
      if(product) break;
    }
    if(!product) return;

    // Set main image and thumbs
    const imgs = Array.isArray(product.img) ? product.img : [product.img];
    $('#main-image').attr('src', imgs[0]);
    const $thumbs = $('#thumbs');
    $thumbs.empty();
    imgs.forEach(img => {
      $thumbs.append('<img src="'+img+'" class="thumb" width="80" alt="">');
    });

    // Set title, desc, price
    $('#product-title').text(product.title);
    $('#product-price').text(product.price);
    // Add basic desc if not present
    $('#product-desc').text('High-quality product for your PC needs.');

    // Set features
    const $features = $('#product-features');
    $features.empty();
    if(product.features && product.features.length > 0){
      product.features.forEach(feature => {
        $features.append('<li>' + feature + '</li>');
      });
    }

    // Set specs
    const $specsTable = $('table.table tbody');
    $specsTable.empty();
    if(product.specs){
      Object.keys(product.specs).forEach(key => {
        $specsTable.append('<tr><td>' + key + '</td><td>' + product.specs[key] + '</td></tr>');
      });
    }
  }

  // Function to update product detail page with specs and features
  function loadProductDetail(){
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const category = urlParams.get('cat');
    if(!productId || !category) return;

    let product;
    for(const cat in sampleProducts){
      if(cat === category){
        product = sampleProducts[cat].find(p => p.id === productId);
        if(product) break;
      }
    }
    if(!product) return;

    // Set main image and thumbs
    const imgs = Array.isArray(product.img) ? product.img : [product.img];
    $('#main-image').attr('src', imgs[0]);
    const $thumbs = $('#thumbs');
    $thumbs.empty();
    imgs.forEach(img => {
      $thumbs.append('<img src="'+img+'" class="thumb" width="80" alt="">');
    });

    // Set title, desc, price
    $('#product-title').text(product.title);
    $('#product-price').text(product.price);
    // Add basic desc if not present
    $('#product-desc').text('High-quality product for your needs.');

    // Set features
    const $featuresList = $('#product-features');
    $featuresList.empty();
    if(product.features){
      product.features.forEach(feature => {
        $featuresList.append('<li>' + feature + '</li>');
      });
    }

    // Set specifications
    const $specsTable = $('table.table tbody');
    $specsTable.empty();
    if(product.specs){
      Object.keys(product.specs).forEach(key => {
        $specsTable.append('<tr><td>' + key + '</td><td>' + product.specs[key] + '</td></tr>');
      });
    }
  }

  // Initialize product detail on page load
  if(window.location.pathname.includes('product-detail.html')){
    loadProductDetail();
  }

  // Category click handler (delegated)
  $(document).on('click', '.category-card', function(){ // fallback
    const id = $(this).data('id');
    if(id) showCategoryProducts(id);
  });
  $(document).on('click', '.card.category-card', function(){
    const id = $(this).data('id');
    if(id) showCategoryProducts(id);
  });

  // Initialize
  renderNews();
  renderCategories();

  // Simple "add to wishlist" feedback
  $(document).on('click', '#add-wishlist', function(){
    alert('Product added to wishlist (demo)');
  });

  // Buy Now button functionality
  $(document).on('click', '.btn-main', function(){
    if($(this).text().trim() === 'Buy Now'){
      alert('Product added to cart!');
    }
  });

});

// Hero Slider Animation
$(document).ready(function() {
  // Add fade effect manually when slide changes
  $('#hero-slider').on('slide.bs.carousel', function (e) {
    let nextH1 = $(e.relatedTarget).find('h1');
    let nextP = $(e.relatedTarget).find('p');
    nextH1.addClass('animate__animated animate__fadeInDown');
    nextP.addClass('animate__animated animate__fadeInUp');
  });
});

// Scroll-to-top Button Functionality (if element exists)
const scrollTopBtn = $("#scrollTopBtn");
if (scrollTopBtn.length) {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
      scrollTopBtn.fadeIn();
    } else {
      scrollTopBtn.fadeOut();
    }
  });
  scrollTopBtn.click(function() {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
}

// Glow Animation (Footer Logo)
$(".footer-logo").hover(
  function() {
    $(this).find(".logo-bar").css("box-shadow", "0 0 20px #1da1f2");
  },
  function() {
    $(this).find(".logo-bar").css("box-shadow", "0 0 6px #1da1f2");
  }
);
