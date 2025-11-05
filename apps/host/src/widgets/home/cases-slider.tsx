"use client";

import { Button } from "@/shared/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { useState } from "react";

const cases = [
  {
    title:
      "Кейс 1. Индивидуальный риелтор: “Теперь я трачу на подборку 10 минут вместо часа”",
    text: "Раньше Анна собирала объекты для клиентов вручную — копировала ссылки с Авито и Циан, вставляла в Excel, пересылала всё в WhatsApp. Клиенты путались, не открывали ссылки, теряли варианты.",
    desctiption:
      "Теперь она добавляет все объекты прямо в сервис и делает подборки в 2 клика. Отправляет клиенту одну красивую ссылку, где тот ставит лайки на понравившиеся варианты.",
    imageUrl: "/cases/case1.png",
  },
  {
    title:
      "Кейс 2. Агентство недвижимости: “Вся команда работает из одной базы”",
    text: "Каждый агент вёл свои таблицы. Клиенты пересекались, объекты дублировались, сложно было понять, кто с кем работает.",
    desctiption:
      "Агентство перенесло все объекты в Reelook. Теперь у каждого агента — доступ к общей базе: можно фильтровать, собирать подборки, смотреть аналитику по клиентам.",
    imageUrl: "/cases/case1.png",
  },
  {
    title:
      "Кейс 3. Работа с премиум-клиентами: “Показываю только то, что им реально интересно”",
    text: "Премиальные клиенты не хотят тратить время на десятки предложений. Риелтору нужно быстро понять их вкус и не повторяться.",
    desctiption:
      "Reelook показывает, какие объекты клиент лайкнул и какие пропустил. Риелтор видит аналитику интереса и сразу подбирает релевантные варианты.",
    imageUrl: "/cases/case1.png",
  },
];

export const CasesSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  // const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   if (!api) return;

  //   setCurrent(api.selectedScrollSnap());

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap());
  //   });
  // }, [api]);

  return (
    <div className="w-full flex items-center justify-between gap-4">
      <Button
        variant={"ghost"}
        className="size-16 border-none hover:bg-transparent"
        size={"icon"}
        onClick={() => api?.scrollPrev()}
      >
        <ChevronLeft className="size-full stroke-2" />
      </Button>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {cases.map((caseItem, index) => (
            <CarouselItem key={index}>
              <div className="bg-light rounded-2xl p-4 relative">
                <Image
                  src={caseItem.imageUrl}
                  alt={caseItem.title}
                  width={600}
                  height={400}
                  className="rounded-2xl w-full aspect-[1200/956] object-cover object-center"
                />
                <div className="absolute w-full max-w-[33.3125rem] bottom-4 left-4 bg-light px-5 py-6 rounded-tr-2xl flex flex-col gap-5">
                  <span className="text-lg font-bold">{caseItem.title}</span>
                  <p className="text-base text-dark">{caseItem.text}</p>
                  <p className="text-base font-semibold text-primary-foreground">
                    {caseItem.desctiption}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Button
        variant={"ghost"}
        className="size-16 border-none hover:bg-transparent"
        size={"icon"}
        onClick={() => api?.scrollNext()}
      >
        <ChevronRight className="size-full stroke-2" />
      </Button>
    </div>
  );
};
