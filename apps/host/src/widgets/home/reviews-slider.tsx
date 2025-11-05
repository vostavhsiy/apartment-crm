"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { useEffect, useState } from "react";

const reviews = [
  {
    title: "Анна Кузнецова, частный риелтор",
    text: "“Раньше я тратила по часу, чтобы собрать клиенту подборку из Авито и Циан. Теперь добавляю все объекты в Reelook — и за 10 минут готова красивая подборка со статистикой. Клиент сам лайкает, что ему нравится, а я просто вижу результат.”",
    imageUrl: "/reviews/review1.png",
  },
  {
    title: "Евгений Руденко, руководитель агентства",
    text: "“Раньше у каждого агента была своя база, постоянные дубли и путаница. Теперь у нас единая система — все объекты и клиенты в одном месте. Я вижу, кто чем занят и какие подборки реально работают.”",
    imageUrl: "/reviews/review2.png",
  },
  {
    title: "Мария Лещенко, агент по элитной недвижимости",
    text: "“Клиенты с высоким чеком хотят персональный подход. Раньше я гадала, что им понравилось, а что нет. Теперь вижу их реакцию сразу — лайки, просмотры, время на странице. Работаю точечно, без догадок.”",
    imageUrl: "/reviews/review3.png",
  },
];

export const ReviewsSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full flex items-center justify-between gap-1.5">
        <Button
          variant={"ghost"}
          className="size-9 mb-10 border-none hover:bg-transparent"
          size={"icon"}
          onClick={() => api?.scrollPrev()}
        >
          <ChevronLeft className="size-full stroke-1" />
        </Button>
        <div className="inner-container">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {reviews.map((caseItem, index) => (
                <CarouselItem key={index} className="px-10 pb-10">
                  <div className="rounded-2xl bg-light overflow-hidden shadow-[0_9px_20px_rgba(0,0,0,0.15)]">
                    <div className="flex flex-col gap-5 w-full h-full p-10 bg-[linear-gradient(141deg,#fff_0%,rgba(235,232,255,0.6)_100%)]">
                      <div className="flex items-center gap-4.5">
                        <Image
                          src={caseItem.imageUrl}
                          alt={caseItem.title}
                          width={52}
                          height={52}
                          className="rounded-full size-12.5 object-cover object-center"
                        />
                        <span className="text-xl font-bold">
                          {caseItem.title}
                        </span>
                      </div>
                      <p className="text-lg text-dark">{caseItem.text}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <Button
          variant={"ghost"}
          className="size-9 mb-10 border-none hover:bg-transparent"
          size={"icon"}
          onClick={() => api?.scrollNext()}
        >
          <ChevronRight className="size-full stroke-1" />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2.5">
        {reviews.map((_, index) => (
          <div
            key={index}
            className={cn(
              "cursor-pointer w-15 h-[3px] rounded-full bg-light-secondary transition-all",
              current === index && "bg-primary",
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};
