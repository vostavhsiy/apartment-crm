"use client";

import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { useEffect, useState } from "react";

export const TestimonialsSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      name: "Анна Петрова",
      role: "Ведущий риэлтор, Москва",
      avatar: "/professional-woman-realtor.jpg",
      content:
        "РиэлтПро полностью изменил мой подход к работе. Раньше я тратила часы на организацию данных в Excel, теперь все автоматизировано. За первый месяц использования я закрыла на 3 сделки больше обычного!",
      rating: 5,
      stats: "+45% к продажам",
    },
    {
      name: "Михаил Сидоров",
      role: "Руководитель агентства, Санкт-Петербург",
      avatar: "/professional-man-business.png",
      content:
        "Внедрил РиэлтПро для всей команды из 12 риэлторов. Аналитика в реальном времени позволяет видеть, какие объекты интересуют клиентов больше всего. Конверсия выросла на 40% за квартал.",
      rating: 5,
      stats: "12 риэлторов в команде",
    },
    {
      name: "Елена Козлова",
      role: "Независимый риэлтор, Екатеринбург",
      avatar: "/professional-woman-smiling.png",
      content:
        "Ипотечный калькулятор и коллекции объектов — это просто находка! Клиенты сами выбирают понравившиеся квартиры, а я вижу их предпочтения. Экономлю минимум 10 часов в неделю.",
      rating: 5,
      stats: "10 часов экономии в неделю",
    },
    {
      name: "Дмитрий Волков",
      role: "Риэлтор-эксперт, Казань",
      avatar: "/professional-man-confident.jpg",
      content:
        "Работаю в сфере недвижимости 8 лет, перепробовал множество CRM. РиэлтПро — лучшее решение, которое я видел. И это бесплатно! Особенно нравится функция автозаполнения описаний через ИИ.",
      rating: 5,
      stats: "8 лет опыта",
    },
    {
      name: "Ольга Смирнова",
      role: "Риэлтор премиум-сегмента, Москва",
      avatar: "/elegant-professional-woman.jpg",
      content:
        "Мои клиенты ценят индивидуальный подход. С РиэлтПро я создаю персональные подборки объектов с калькулятором ипотеки. Это выглядит очень профессионально и повышает доверие.",
      rating: 5,
      stats: "Премиум-сегмент",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="max-w-5xl mx-auto">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-2">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      {/* <motion.img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      /> */}
                      <div className="flex-1">
                        <motion.div
                          className="flex mb-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                            >
                              <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            </motion.div>
                          ))}
                        </motion.div>
                        <motion.p
                          className="text-lg text-muted-foreground mb-6 leading-relaxed italic"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          "{testimonial.content}"
                        </motion.p>
                        <motion.div
                          className="flex items-center justify-between flex-wrap gap-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div>
                            <p className="font-semibold text-lg">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            {testimonial.stats}
                          </Badge>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-4 mt-8">
          <CarouselPrevious className="static translate-y-0" />
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};
