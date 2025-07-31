import React, { useState, useEffect } from 'react';

const HomePage = () => {
    const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Placeholder for articles to keep the news section structure
    const articles = [
        {
            id: '1',
            title: 'Khám phá công nghệ truy xuất nguồn gốc nông sản',
            category: 'Công nghệ',
            summary: 'Tìm hiểu cách công nghệ giúp minh bạch hóa chuỗi cung ứng nông sản và xây dựng niềm tin cho người tiêu dùng.',
            imageUrl: 'https://images.unsplash.com/photo-1542478144-d92795e1ee74?q=80&w=600&auto=format&fit=crop',
            createdAt: { seconds: Date.now() / 1000 }
        },
        {
            id: '2',
            title: 'Lợi ích của truy xuất nguồn gốc đối với nông dân',
            category: 'Kinh doanh',
            summary: 'Bài viết phân tích những lợi ích thiết thực mà hệ thống truy xuất nguồn gốc mang lại cho bà con nông dân.',
            imageUrl: 'https://images.unsplash.com/photo-1588661802913-c91f16279f2e?q=80&w=600&auto=format&fit=crop',
            createdAt: { seconds: Date.now() / 1000 }
        },
        {
            id: '3',
            title: 'Quy trình đơn giản để áp dụng truy xuất nguồn gốc',
            category: 'Hướng dẫn',
            summary: 'Hướng dẫn từng bước giúp người nông dân dễ dàng tích hợp công nghệ truy xuất nguồn gốc vào sản xuất.',
            imageUrl: 'https://images.unsplash.com/photo-1517457210-bbbcdbc79502?q=80&w=600&auto=format&fit=crop',
            createdAt: { seconds: Date.now() / 1000 }
        }
    ];

    useEffect(() => {
        const handleHashChange = () => {
            setCurrentHash(window.location.hash || '#home');
        };
        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('popstate', handleHashChange);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: "-40% 0px -60% 0px" });

        document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('popstate', handleHashChange);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (currentHash === '#home' || document.querySelector(currentHash)) {
            const targetElement = document.querySelector(currentHash);
            if (targetElement) {
                setTimeout(() => {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 0);
            }
        }
    }, [currentHash]);

    // Fix 1: Explicitly type 'e' and 'hash'
    const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        e.preventDefault();
        history.pushState(null, '', hash);
        setCurrentHash(hash);
        setIsMobileMenuOpen(false);
    };

    // Fix 1: Explicitly type 'e'
    const toggleAccordion = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const content = button.nextElementSibling as HTMLElement; // Cast to HTMLElement for style property
        button.querySelector('svg')?.classList.toggle('rotate-180'); // Use optional chaining for querySelector
        if (content.style.maxHeight) {
            content.style.maxHeight = "";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    };

    return (
            <div id="public-view" className="text-gray-800">
                {/* HEADER */}
                <header id="header" className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40">
                    <div className="container mx-auto px-4">
                        <nav className="flex justify-between items-center py-4">
                            <a href="#home" className="nav-link-logo" onClick={(e) => handleNavLinkClick(e, '#home')}>
                                <img src="https://xacthucso.s3.amazonaws.com/b242-2b43443a-06b4-4242-83bd-8c51854a740c.png" alt="Logo Xác Thực Số" className="h-10 w-auto" />
                            </a>
                            <div className="hidden md:flex items-center space-x-8">
                                <a href="#home" className={`nav-link ${currentHash === '#home' ? 'active' : ''}`} onClick={(e) => handleNavLinkClick(e, '#home')}>Trang chủ</a>
                                <a href="#solutions" className={`nav-link ${currentHash === '#solutions' ? 'active' : ''}`} onClick={(e) => handleNavLinkClick(e, '#solutions')}>Giải pháp</a>
                                <a href="#features" className={`nav-link ${currentHash === '#features' ? 'active' : ''}`} onClick={(e) => handleNavLinkClick(e, '#features')}>Tính năng</a>
                                <a href="#pricing" className={`nav-link ${currentHash === '#pricing' ? 'active' : ''}`} onClick={(e) => handleNavLinkClick(e, '#pricing')}>Bảng giá</a>
                                <a href="#news" className={`nav-link ${currentHash === '#news' ? 'active' : ''}`} onClick={(e) => handleNavLinkClick(e, '#news')}>Tin tức</a>
                                <a href="#guides" className={`nav-link ${currentHash === '#guides' ? 'active' : ''}`} onClick={(e) => handleNavLinkClick(e, '#guides')}>Hướng dẫn</a>
                                <a href="#contact" className={`nav-link ${currentHash === '#contact' ? 'active' : ''}`} onClick={(e) => handleNavLinkClick(e, '#contact')}>Liên hệ</a>
                            </div>
                            <div className="hidden md:flex items-center space-x-2">
                                <a href="./login" className="px-4 py-2 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition">Đăng nhập</a>
                                <a href="./register" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow">Dùng thật miễn phí ngay</a>
                            </div>
                            <button id="mobile-menu-button" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                            </button>
                        </nav>
                    </div>
                    {/* Mobile Menu */}
                    <div id="mobile-menu" className={`md:hidden px-4 pb-4 ${isMobileMenuOpen ? '' : 'hidden'}`}>
                        <a href="#home" className="nav-link-mobile block py-2" onClick={(e) => handleNavLinkClick(e, '#home')}>Trang chủ</a>
                        <a href="#solutions" className="nav-link-mobile block py-2" onClick={(e) => handleNavLinkClick(e, '#solutions')}>Giải pháp</a>
                        <a href="#features" className="nav-link-mobile block py-2" onClick={(e) => handleNavLinkClick(e, '#features')}>Tính năng</a>
                        <a href="#pricing" className="nav-link-mobile block py-2" onClick={(e) => handleNavLinkClick(e, '#pricing')}>Bảng giá</a>
                        <a href="#news" className="nav-link-mobile block py-2" onClick={(e) => handleNavLinkClick(e, '#news')}>Tin tức</a>
                        <a href="#guides" className="nav-link-mobile block py-2" onClick={(e) => handleNavLinkClick(e, '#guides')}>Hướng dẫn</a>
                        <a href="#contact" className="nav-link-mobile block py-2" onClick={(e) => handleNavLinkClick(e, '#contact')}>Liên hệ</a>
                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                            <a href="./login.html" className="block w-full text-center px-4 py-2 text-gray-600 font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 transition">Đăng nhập</a>
                            <a href="./register.htmlc" className="block w-full text-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow">Dùng thật miễn phí ngay</a>
                        </div>
                    </div>
                </header>

                <main>
                    {/* Hero Section */}
                    <section id="home" className="hero-bg pt-16">
                        <div className="container mx-auto px-4 py-24 md:py-32 text-center">
                            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">Minh bạch nông sản,<br />Vững vàng giá trị.</h1>
                            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Công cụ truy xuất nguồn gốc đơn giản, giúp bà con nông dân chủ động bán hàng, không bị ép giá, và tự tin khẳng định chất lượng sản phẩm.</p>
                        </div>
                    </section>

                    {/* Solutions Section */}
                    <section id="solutions" className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-4">Giải pháp chuyên biệt cho từng ngành hàng</h2>
                            <p className="text-xl text-center text-gray-500 mb-16 max-w-3xl mx-auto">Chúng tôi lấy người nông dân làm trọng tâm, từ đó phát triển các giải pháp mạnh mẽ và linh hoạt cho mọi lĩnh vực.</p>

                            <div className="grid md:grid-cols-1 gap-8">
                                {/* Solution Card for Agriculture */}
                                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ring-2 ring-blue-500">
                                    <div className="md:flex items-center gap-8">
                                        <img src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=300&auto=format&fit=crop" className="w-full md:w-1/4 h-48 object-cover rounded-lg mb-6 md:mb-0" alt="Nông nghiệp" />
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold mb-3">Dành cho Nông nghiệp & Hợp tác xã</h3>
                                            <p className="text-gray-600 mb-4">Công cụ sinh ra để phục vụ bà con. Giúp nông sản Việt được minh bạch, được tin tưởng và bán với giá trị xứng đáng.</p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex gap-2"><strong className="text-blue-600">Lợi ích:</strong><span>Ghi nhật ký điện tử dễ dàng, tạo tem truy xuất cho từng luống rau, đàn gà, lô quả. Tự tin giới thiệu sản phẩm sạch đến người tiêu dùng và các chuỗi siêu thị.</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8 mt-8">
                                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                    <h3 className="text-xl font-bold mb-3">Thời trang & Phụ kiện</h3>
                                    <p className="text-gray-600 mb-4">Chống hàng giả, quản lý bộ sưu tập và kể câu chuyện thương hiệu.</p>
                                </div>
                                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                    <h3 className="text-xl font-bold mb-3">Thủ công mỹ nghệ</h3>
                                    <p className="text-gray-600 mb-4">Chứng thực sản phẩm độc bản, tôn vinh nghệ nhân và làng nghề truyền thống.</p>
                                </div>
                                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                    <h3 className="text-xl font-bold mb-3">Linh kiện & Điện tử</h3>
                                    <p className="text-gray-600 mb-4">Kích hoạt bảo hành điện tử, truy xuất nguồn gốc linh kiện và quản lý lịch sử sửa chữa.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section id="features" className="container mx-auto px-4 py-20">
                        <h1 className="text-4xl font-bold text-center mb-4">Đơn giản để bắt đầu, mạnh mẽ để phát triển.</h1>
                        <p className="text-xl text-center text-gray-500 mb-16 max-w-3xl mx-auto">Khám phá bộ công cụ toàn diện giúp bạn vận hành tinh gọn và hiệu quả, dù bạn ở quy mô nào.</p>

                        <div className="space-y-20">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <img src="https://xacthucso.s3.amazonaws.com/b242-61fc0bb9-3497-4e6f-87c8-a9b08bf06419.png" alt="Quản lý Tài khoản" className="rounded-lg shadow-lg order-2 md:order-1 h-80 object-cover" />
                                <div className="order-1 md:order-2">
                                    <h3 className="text-2xl font-bold mb-4">Quản lý Tài khoản Linh hoạt</h3>
                                    <p className="text-gray-600 mb-4">Đăng nhập và quản lý công việc theo cách thuận tiện nhất cho bạn.</p>
                                    <ul className="space-y-2">
                                        <li className="flex gap-3"><span className="text-blue-500 font-bold">✓</span><span>Đăng nhập bằng bất cứ thứ gì bạn có: Zalo, SĐT, Email...</span></li>
                                        <li className="flex gap-3"><span className="text-blue-500 font-bold">✓</span><span>An toàn tuyệt đối với khả năng khôi phục bằng CCCD.</span></li>
                                        <li className="flex gap-3"><span className="text-blue-500 font-bold">✓</span><span>Quản lý nhiều thương hiệu, nhiều cơ sở kinh doanh trên cùng một tài khoản.</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">Truy xuất Nguồn gốc Toàn diện</h3>
                                    <p className="text-gray-600 mb-4">Công cụ mạnh mẽ để tạo ra những con tem truy xuất không thể làm giả.</p>
                                    <ul className="space-y-2">
                                        <li className="flex gap-3"><span className="text-blue-500 font-bold">✓</span><span>Tạo tem QR động, mỗi sản phẩm một định danh, chống sao chép.</span></li>
                                        <li className="flex gap-3"><span className="text-blue-500 font-bold">✓</span><span>Tùy chỉnh màn hình hiển thị thông tin khi khách hàng quét mã.</span></li>
                                        <li className="flex gap-3"><span className="text-blue-500 font-bold">✓</span><span>Hỗ trợ cả 2 quy trình: In tem rồi kích hoạt hoặc Kích hoạt rồi mới in.</span></li>
                                    </ul>
                                </div>
                                <img src="https://xacthucso.s3.amazonaws.com/b242-5f7e1f3a-cd08-4212-8e36-36b0bb2cf579.png" alt="Truy xuất Nguồn gốc" className="rounded-lg shadow-lg h-80 object-cover" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <img src="https://xacthucso.s3.amazonaws.com/b242-76fd7163-13f6-4ca0-8f35-fa30732ecf51.png" alt="Quản lý Sản xuất" className="rounded-lg shadow-lg order-2 md:order-1 h-80 object-cover" />
                                <div className="order-1 md:order-2">
                                    <h3 className="text-2xl font-bold mb-4">Quản lý Sản xuất & Vận hành Tinh gọn</h3>
                                    <p className="text-gray-600 mb-4">Số hóa quy trình vận hành để tiết kiệm thời gian và giảm thiểu sai sót.</p>
                                    <ul className="space-y-2">
                                        <li className="flex gap-3"><span className="text-blue-500 font-bold">✓</span><span>Quản lý danh mục sản phẩm, thuộc tính, hình ảnh, tài liệu đính kèm.</span></li>
                                        <li className="flex gap-3"><span className="text-blue-500 font-bold">✓</span><span>Phân quyền chi tiết cho nhân viên: ai quản kho, ai bán hàng, ai giám sát...</span></li>
                                        <li className="flex gap-3"><span className="text-blue-500 font-bold">✓</span><span>Theo dõi lịch sử in tem, hủy tem, bán hàng theo thời gian thực.</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pricing Section */}
                    <section id="pricing" className="container mx-auto px-4 py-20">
                        <h1 className="text-4xl font-bold text-center mb-4">Minh bạch, linh hoạt và không có chi phí ẩn.</h1>
                        <p className="text-xl text-center text-gray-500 mb-16 max-w-3xl mx-auto">Chọn gói dịch vụ phù hợp nhất với nhu cầu và quy mô kinh doanh của bạn. Bắt đầu miễn phí và nâng cấp bất cứ lúc nào.</p>

                        <div className="text-center bg-green-50 p-8 rounded-2xl border-l-4 border-green-500 mb-16 max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold text-green-800 mb-4">Dùng Thật Miễn Phí - Không Lo Chi Phí!</h3>
                            <p className="text-gray-700 text-lg">
                                Chúng tôi tin rằng công nghệ là để phục vụ. Vì vậy, <strong>gói cơ bản miễn phí của Xác Thực Số đã đủ dùng cho đa số bà con nông dân sản xuất nhỏ.</strong>
                                Bạn chỉ cần trả phí khi đã bán được nhiều hàng, khi thực sự phát triển. Chi phí nâng cấp cũng vô cùng nhỏ, không làm tăng giá thành sản phẩm.
                                <br /><br />
                                Hãy cứ yên tâm sản xuất, chuyện công nghệ cứ để chúng tôi lo.
                            </p>
                        </div>
                    </section>

                    {/* News Page Content */}
                    <section id="news" className="container mx-auto px-4 py-20">
                        <h1 className="text-4xl font-bold text-center mb-4">Tin tức & Chia sẻ</h1>
                        <p className="text-xl text-center text-gray-500 mb-16 max-w-3xl mx-auto">Cập nhật những thông tin mới nhất về thị trường, chính sách và công nghệ để hỗ trợ công việc kinh doanh của bạn.</p>
                        <div id="news-content-area" className="grid lg:grid-cols-3 gap-8">
                            {articles.length > 0 ? (
                                articles.map(article => (
                                    <div key={article.id} className="lg:col-span-1 bg-white rounded-lg shadow-lg overflow-hidden group">
                                        <a href="#" className="article-link" onClick={(e) => { e.preventDefault(); /* Handle article view */ }}>
                                            <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                            <div className="p-6">
                                                <span className="text-sm font-semibold text-blue-500">{article.category}</span>
                                                <h3 className="text-xl font-bold my-2 group-hover:text-blue-500 transition">{article.title}</h3>
                                                <p className="text-gray-600">{article.summary}</p>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <div className="lg:col-span-3 text-center text-gray-500">Đang tải tin tức...</div>
                            )}
                        </div>
                    </section>

                    {/* Guides & FAQ Section */}
                    <section id="guides" className="container mx-auto px-4 py-20">
                        <h1 className="text-4xl font-bold text-center mb-4">Hướng dẫn sử dụng & Câu hỏi thường gặp</h1>
                        <p className="text-xl text-center text-gray-500 mb-16 max-w-3xl mx-auto">Tất cả những gì bạn cần biết để bắt đầu và sử dụng thành thạo Xác Thực Số.</p>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-bold mb-6">Câu hỏi thường gặp (FAQ)</h2>
                                <div className="space-y-4" id="faq-accordion">
                                    {/* FAQ Item 1 */}
                                    <div className="bg-white rounded-lg shadow-sm">
                                        <button className="accordion-button flex justify-between items-center w-full p-5 font-semibold text-left" onClick={toggleAccordion}>
                                            <span>Hệ thống này có khó sử dụng không?</span>
                                            <svg className="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </button>
                                        <div className="accordion-content">
                                            <p className="p-5 pt-0 text-gray-600">Hoàn toàn không! Xác Thực Số được thiết kế với tiêu chí đơn giản hàng đầu. Bạn có thể đăng nhập bằng Zalo, các thao tác được hướng dẫn chi tiết bằng tiếng Việt. Nếu bạn dùng được Zalo, bạn chắc chắn dùng được Xác Thực Số.</p>
                                        </div>
                                    </div>
                                    {/* FAQ Item 2 */}
                                    <div className="bg-white rounded-lg shadow-sm">
                                        <button className="accordion-button flex justify-between items-center w-full p-5 font-semibold text-left" onClick={toggleAccordion}>
                                            <span>Tôi có cần cài đặt phần mềm gì không?</span>
                                            <svg className="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </button>
                                        <div className="accordion-content">
                                            <p className="p-5 pt-0 text-gray-600">Không cần. Xác Thực Số hoạt động hoàn toàn trên nền tảng web (WebApp). Bạn chỉ cần truy cập website của chúng tôi từ bất kỳ thiết bị nào có kết nối internet (điện thoại, máy tính bảng, máy tính).</p>
                                        </div>
                                    </div>
                                    {/* FAQ Item 3 */}
                                    <div className="bg-white rounded-lg shadow-sm">
                                        <button className="accordion-button flex justify-between items-center w-full p-5 font-semibold text-left" onClick={toggleAccordion}>
                                            <span>Nếu tôi in tem bị lỗi hoặc hỏng thì sao?</span>
                                            <svg className="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </button>
                                        <div className="accordion-content">
                                            <p className="p-5 pt-0 text-gray-600">Để đảm bảo an toàn và tính duy nhất, hệ thống không cho phép "in lại" một mã tem đã sinh ra. Nếu tem bị lỗi, bạn chỉ cần vào hệ thống, hủy mã tem đó và tiến hành in một mã tem mới. Thao tác này rất đơn giản và giúp đảm bảo không có hai sản phẩm nào có cùng một mã.</p>
                                        </div>
                                    </div>
                                    {/* FAQ Item 4 */}
                                    <div className="bg-white rounded-lg shadow-sm">
                                        <button className="accordion-button flex justify-between items-center w-full p-5 font-semibold text-left" onClick={toggleAccordion}>
                                            <span>Dữ liệu của tôi có được bảo mật không?</span>
                                            <svg className="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </button>
                                        <div className="accordion-content">
                                            <p className="p-5 pt-0 text-gray-600">Tuyệt đối. Dữ liệu của mỗi Chủ thể (doanh nghiệp) là hoàn toàn độc lập và được bảo mật. Chúng tôi tuân thủ các tiêu chuẩn bảo mật cao nhất để bảo vệ thông tin kinh doanh của bạn. Trong chuỗi cung ứng, các đối tác chỉ thấy được thông tin của mắt xích ngay trước và ngay sau mình.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-1">
                                <h2 className="text-2xl font-bold mb-6">Video hướng dẫn</h2>
                                <div className="space-y-4">
                                    <a href="https://youtube.com/shorts/5PQ0pPjielo?feature=share" className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        <div className="bg-blue-50 p-3 rounded-lg mr-4"><svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.667 3.75a.75.75 0 00-.75.75v10.5a.75.75 0 00.75.75h14.666a.75.75 0 00.75-.75V4.5a.75.75 0 00-.75-.75H2.667zM9.25 12.164a.75.75 0 001.5 0V7.836a.75.75 0 00-1.5 0v4.328z"></path></svg></div>
                                        <div>
                                            <h4 className="font-semibold">Cách đăng ký tài khoản</h4>
                                            <p className="text-sm text-gray-500">Video 1:32</p>
                                        </div>
                                    </a>
                                    <a href="https://youtube.com/shorts/jy8p3rrFy-M?feature=share" className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        <div className="bg-blue-50 p-3 rounded-lg mr-4"><svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.667 3.75a.75.75 0 00-.75.75v10.5a.75.75 0 00.75.75h14.666a.75.75 0 00.75-.75V4.5a.75.75 0 00-.75-.75H2.667zM9.25 12.164a.75.75 0 001.5 0V7.836a.75.75 0 00-1.5 0v4.328z"></path></svg></div>
                                        <div>
                                            <h4 className="font-semibold">Tạo sản phẩm và in tem</h4>
                                            <p className="text-sm text-gray-500">Video 3:15</p>
                                        </div>
                                    </a>
                                    <a href="https://youtube.com/shorts/jy8p3rrFy-M?feature=share" className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        <div className="bg-blue-50 p-3 rounded-lg mr-4"><svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.667 3.75a.75.75 0 00-.75.75v10.5a.75.75 0 00.75.75h14.666a.75.75 0 00.75-.75V4.5a.75.75 0 00-.75-.75H2.667zM9.25 12.164a.75.75 0 001.5 0V7.836a.75.75 0 00-1.5 0v4.328z"></path></svg></div>
                                        <div>
                                            <h4 className="font-semibold">Mời nhân viên vào quản lý</h4>
                                            <p className="text-sm text-gray-500">Video 2:05</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact Page Content */}
                    <section id="contact" className="container mx-auto px-4 py-20">
                        <h1 className="text-4xl font-bold text-center mb-4">Liên hệ với chúng tôi</h1>
                        <p className="text-xl text-center text-gray-500 mb-16 max-w-3xl mx-auto">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Gửi thắc mắc cho chúng tôi hoặc ghé thăm văn phòng để trao đổi trực tiếp.</p>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:grid md:grid-cols-5">
                            <div className="p-8 md:p-12 md:col-span-2 bg-blue-500 text-white">
                                <h3 className="text-2xl font-bold mb-6">Thông tin liên hệ</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <svg className="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        <div>
                                            <p className="font-semibold">Địa chỉ</p>
                                            <p className="text-blue-200">Phòng 1107, Tầng 11,Tòa nhà Thăng Long, 98 Ngụy Như Kon Tum, Phường Nhân Chính, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <svg className="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                        <div>
                                            <p className="font-semibold">Hotline</p>
                                            <p className="text-blue-200">(+84) 888 223 559</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <svg className="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        <div>
                                            <p className="font-semibold">Email</p>
                                            <p className="text-blue-200">info.xacthucso@xts.vn</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    {/* Fix 2: Changed allowFullScreen="" to allowFullScreen={true} */}
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.777575192261!2d105.80196577584088!3d21.001551288711436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aca2be71e3a1%3A0x3e03a60a78542cd5!2sTh%C4%83ng%20Long%20Tower!5e0!3m2!1svi!2s!4v1751276597961!5m2!1svi!2s" width="100%" height="50%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    <img src="https://maps.app.goo.gl/HcUnfZasid5dwdBb9" className="rounded-lg w-full h-auto" alt="" />
                                </div>
                            </div>
                            <div className="p-8 md:p-12 md:col-span-3">
                                <h3 className="text-2xl font-bold mb-6">Gửi thắc mắc cho chúng tôi</h3>
                                <form action="#" method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                                        <input type="text" name="name" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input type="email" name="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                                        {/* Fix 3: Changed rows="5" to rows={5} */}
                                        <textarea name="message" id="message" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition shadow">Gửi tin nhắn</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>

                {/* FOOTER */}
                <footer id="footer" className="bg-slate-800 text-white">
                    <div className="container mx-auto px-4 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Column 1: Logo & Info */}
                            <div className="md:col-span-2 lg:col-span-1">
                                <a href="#home" className="mb-4 block" onClick={(e) => handleNavLinkClick(e, '#home')}>
                                    <img src="https://xacthucso.s3.amazonaws.com/b242-2b43443a-06b4-4242-83bd-8c51854a740c.png" alt="Logo Xác Thực Số" className="h-12 w-auto" />
                                </a>
                                <p className="text-slate-400">Nền tảng truy xuất nguồn gốc và quản lý chuỗi cung ứng hàng đầu, giúp các doanh nghiệp xây dựng niềm tin và nâng tầm thương hiệu.</p>
                            </div>
                            {/* Column 2: Quick Links */}
                            <div>
                                <h4 className="font-semibold text-lg mb-4">Liên kết nhanh</h4>
                                <ul className="space-y-2">
                                    <li><a href="#features" className="text-slate-400 hover:text-white transition" onClick={(e) => handleNavLinkClick(e, '#features')}>Tính năng</a></li>
                                    <li><a href="#solutions" className="text-slate-400 hover:text-white transition" onClick={(e) => handleNavLinkClick(e, '#solutions')}>Giải pháp</a></li>
                                    <li><a href="#pricing" className="text-slate-400 hover:text-white transition" onClick={(e) => handleNavLinkClick(e, '#pricing')}>Bảng giá</a></li>
                                </ul>
                            </div>
                            {/* Column 3: Support */}
                            <div>
                                <h4 className="font-semibold text-lg mb-4">Hỗ trợ</h4>
                                <ul className="space-y-2">
                                    <li><a href="#guides" className="text-slate-400 hover:text-white transition" onClick={(e) => handleNavLinkClick(e, '#guides')}>Hướng dẫn</a></li>
                                    <li><a href="#guides" className="text-slate-400 hover:text-white transition" onClick={(e) => handleNavLinkClick(e, '#guides')}>Câu hỏi thường gặp</a></li>
                                    <li><a href="#contact" className="text-slate-400 hover:text-white transition" onClick={(e) => handleNavLinkClick(e, '#contact')}>Liên hệ</a></li>
                                </ul>
                            </div>
                            {/* Column 4: Legal */}
                            <div>
                                <h4 className="font-semibold text-lg mb-4">Pháp lý</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-slate-400 hover:text-white transition">Điều khoản dịch vụ</a></li>
                                    <li><a href="#" className="text-slate-400 hover:text-white transition">Chính sách bảo mật</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-slate-500 text-sm">© 2025 Xác Thực Số. All rights reserved.</p>
                            <div className="flex space-x-4 mt-4 md:mt-0">
                                <a href="#" className="text-slate-400 hover:text-white"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"></path></svg></a>
                                <a href="#" className="text-slate-400 hover:text-white"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.493-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-2v-3.369c0-.803-.015-1.837-1.12-1.837-1.12 0-1.293.875-1.293 1.778v3.428h-2v-6h1.923v.882h.027c.268-.507.922-1.037 1.895-1.037 2.029 0 2.404 1.334 2.404 3.069v3.522z"></path></svg></a>
                                <a href="#" className="text-slate-400 hover:text-white"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-3.418 0-6.182 2.766-6.182 6.182 0 .484.054.956.16 1.41-5.131-.259-9.682-2.705-12.73-6.46-.529.91-.832 1.97-.832 3.075 0 2.148 1.096 4.041 2.764 5.157-.99-.03-1.922-.303-2.738-.758v.078c0 2.997 2.133 5.497 4.968 6.069-.52.143-1.067.218-1.633.218-.398 0-.785-.038-1.164-.114.785 2.46 3.064 4.256 5.766 4.305-2.118 1.649-4.788 2.633-7.693 2.633-.5 0-.993-.029-1.478-.085 2.744 1.764 6.002 2.79 9.484 2.79 11.377 0 17.604-9.429 17.604-17.604 0-.269-.006-.537-.018-.802.001-.001.001-.002 0 0 .001 0 .001 0 0 0 .002 0 .003 0 0 0 .002 0 .002 0 .001 0 .001 0 .001 0 .001 0 .001 0 .001 0 .001 0 0 0 1.207-.881 2.19-2.018 2.825-.775z"></path></svg></a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
    );
};

export default HomePage;