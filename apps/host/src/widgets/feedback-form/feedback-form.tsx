"use client";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

import type React from "react";
import { useState } from "react";

export const FeedbackForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      target.reset();
      toast.success(
        "Спасибо за ваш отзыв! Мы свяжемся с вами в ближайшее время.",
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-balance">Обратная связь</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Опишите проблему и оставьте контактную информацию для связи
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Описание проблемы</CardTitle>
              <CardDescription>
                Подробно опишите проблему, с которой вы столкнулись
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Описание проблемы</Label>
                <Textarea
                  id="description"
                  placeholder="Пожалуйста, подробно опишите проблему..."
                  className="min-h-32 resize-none"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
              <CardDescription>
                Как мы можем связаться с вами для уточняющих вопросов?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Ваше имя" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Адрес электронной почты</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ваш email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Номер телефона</Label>
                  <Input id="phone" type="tel" placeholder="Ваш номер" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitted}
              className="min-w-32"
            >
              <Send className="h-4 w-4 mr-2" />
              Отправить отзыв
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
