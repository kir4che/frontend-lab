// 建築物分層視差
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CitySvgUrl from '@/assets/gsap-parallax/city.svg';
import FriendImg1 from '@/assets/gsap-parallax/1.png';
import FriendImg2 from '@/assets/gsap-parallax/2.png';
import FriendImg3 from '@/assets/gsap-parallax/3.png';
import FriendImg4 from '@/assets/gsap-parallax/4.png';
import FriendImg5 from '@/assets/gsap-parallax/5.png';
import FriendImg6 from '@/assets/gsap-parallax/6.png';
import FriendImg7 from '@/assets/gsap-parallax/7.png';
import FriendImg8 from '@/assets/gsap-parallax/8.png';
import FriendImg9 from '@/assets/gsap-parallax/9.png';
import FriendImg10 from '@/assets/gsap-parallax/10.png';

gsap.registerPlugin(ScrollTrigger);

const friendImages = [
  FriendImg1,
  FriendImg2,
  FriendImg3,
  FriendImg4,
  FriendImg5,
  FriendImg6,
  FriendImg7,
  FriendImg8,
  FriendImg9,
  FriendImg10,
];

const BuildingParallax: React.FC = () => {
  const bgCityRef = useRef<HTMLDivElement | null>(null);
  const [isSvgLoaded, setIsSvgLoaded] = useState(false);

  // 為了讓 GSAP 可以操作 SVG，要以 DOM 形式載入，不能用 <img>。
  // 動態載入 SVG 並插入 DOM
  useEffect(() => {
    let cancelled = false;

    const loadSVG = async () => {
      try {
        const res = await fetch(CitySvgUrl);
        const svgText = await res.text();
        if (cancelled) return;

        if (bgCityRef.current) {
          // 將 SVG 插入容器中
          bgCityRef.current.innerHTML = svgText;

          // 使 SVG 符合畫面比例
          const svgEl = bgCityRef.current.querySelector('svg');
          if (svgEl) {
            // 置中顯示並裁切超出部分
            svgEl.setAttribute('preserveAspectRatio', 'xMidYMid slice');
            svgEl.setAttribute('width', '100%');
            svgEl.setAttribute('height', '100%');
          }

          setIsSvgLoaded(true);
        }
      } catch (err: unknown) {
        console.error('載入 SVG 失敗：', err);
      }
    };

    loadSVG();

    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      if (!isSvgLoaded || !bgCityRef.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: bgCityRef.current, // 以背景容器作為觸發點
            start: 'top top',
            end: '+=1000',
            scrub: true,
            pin: true,
          },
        });

        // 整體縮放 + 淡出城市背景
        tl.add([
          gsap.to('#bg_city svg', { duration: 2, scale: 1.5 }),
          gsap.to('#full_city', { duration: 2, opacity: 0 }),
        ])
          // 建築物外牆、屋頂淡出 + 位移
          .add([
            gsap.to('#building_top', { duration: 2, y: -200, opacity: 0 }),
            gsap.to('#wall_side', { duration: 2, x: -200, opacity: 0 }),
            gsap.to('#wall_front', { duration: 2, opacity: 0 }),
          ])
          // 建築物內部一層層淡出
          .add([
            gsap.to('#interior_wall_side', {
              duration: 2,
              x: -200,
              opacity: 0,
            }),
            gsap.to('#interior_wall_top', {
              duration: 2,
              y: -200,
              opacity: 0,
            }),
            gsap.to('#interior_wall_side_2', {
              duration: 2,
              opacity: 0,
            }),
            gsap.to('#interior_wall_front', { duration: 2, opacity: 0 }),
          ]);
      }, bgCityRef);

      return () => ctx.revert();
    },
    { dependencies: [isSvgLoaded], scope: bgCityRef },
  );

  return (
    <div>
      <div className="rounded-md bg-black text-white">
        <div className="relative">
          <div
            id="bg_city"
            ref={bgCityRef}
            className="h-screen w-full overflow-hidden [&_svg]:size-full [&_svg]:object-center"
          />
          <div className="absolute top-1/2 left-1/2 h-5/6 w-full -translate-x-1/2 -translate-y-1/2 px-5 max-md:space-y-5">
            <div className="flex-between-center max-md:text-sm">
              <div>
                <p>LUNDEV CHANNEL</p>
                <p>DEVELOPER & DESIGNER</p>
              </div>
              <div className="text-right">
                <p>CONTENT CREATOR</p>
                <p>ALL LANGUAGE</p>
              </div>
            </div>
            <div className="text-center text-5xl font-bold uppercase md:text-7xl">
              <p className="m-0 p-0">Hong Kong</p>
              <p className="m-0 p-0">real estate</p>
            </div>
          </div>
        </div>
        <main className="flex-center relative flex-col gap-16 px-4 py-20 after:absolute after:bottom-full after:left-0 after:z-30 after:h-25 after:w-full after:bg-linear-to-t after:from-black after:to-transparent after:content-['']">
          <div className="space-y-16">
            <div className="space-y-2 text-center">
              <h1 className="text-4xl font-medium md:text-5xl lg:text-6xl">Lun Dev</h1>
              <h2 className="mb-4 text-4xl font-medium md:text-5xl lg:text-6xl">
                Developer & Designer
              </h2>
              <p>
                Please like and subscribe to the channel to watch many interesting videos
                <br />
                about programming and web design
              </p>
            </div>
            <ul className="flex-center flex-wrap gap-8">
              {friendImages.map((imgSrc, index) => (
                <li key={index}>
                  <img src={imgSrc} alt={`Friend ${index + 1}`} className="h-12.5" />
                </li>
              ))}
            </ul>
          </div>
          <div className="max-w-6xl columns-2 [column-width:400px]">
            There are many variations of passages of Lorem Ipsum available, but the majority have
            suffered alteration in some form, by injected humour, or randomised words which don't
            look even slightly believable. If you are going to use a passage of
            <br />
            Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle
            of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks
            as necessary, making this the first true generator on the Internet. It uses a dictionary
            of over
            <br />
            to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore
            always free from repetition, injected humour, or non-characteristic words etc. Contrary
            to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
            classical Latin literature from 45 BC, making it over 2000 years old. Richard
            McClintock, a Latin professor at Hampden-Sydney
            <br />
            College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
            Lorem Ipsum passage, and going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
            of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in
            45 BC. This book is a treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a
            line in section 1.10.32. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing
            <br />
            <br />
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at its layout. The
            point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
            as opposed to using
            <br />
            'Content here, content here', making it look like readable English. Many desktop
            publishing packages and web page editors now use Lorem Ipsum as their default model
            text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
            <br />
            <br />
            Various versions have evolved over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like).
          </div>
        </main>
      </div>
      <p className="mt-2 text-right text-xs text-gray-500">
        學習自{' '}
        <a
          href="https://www.youtube.com/watch?v=tk3ivPgOwpc"
          target="_blank"
          rel="noreferrer"
          className="text-pink-600 hover:underline"
        >
          Lun Dev - Multilayer Parallax Scroll Animation with HTML and GSAP
        </a>
      </p>
    </div>
  );
};

export default BuildingParallax;
