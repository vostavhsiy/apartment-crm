"use client";

import { useCreateApartment } from "@/entities/apartment/api/hooks";
import { setLCItem } from "@/shared/lib/helpers/local-storage";
import { cn, reorder } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import { LC_EDITOR_NAME, SimpleEditor } from "@/shared/ui/tiptap-templates";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripVertical, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useEffect, useState } from "react";

const formSchema = z.object({
  title: z.string().min(2, "Название должно содержать не менее 2 символов"),
  subtitle: z.string(),
  description: z.string(),
  address: z.string(),
  price: z.string(),
  features: z.string(),
});

interface Props {
  userId: string;
  collectionId: string;
}

export const AddApartmentForm = ({ userId, collectionId }: Props) => {
  const { mutate: addApartment, isPending } = useCreateApartment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      address: "",
      price: "",
      features: "",
    },
  });

  const router = useRouter();

  const [newFeatureName, setNewFeatureName] = useState("");
  const [newFeatureValue, setNewFeatureValue] = useState("");

  const [images, setImages] = useState<Array<{ file: File; id: string }>>([]);

  const [features, setFeatures] = useState<
    Array<{ name: string; value: string }>
  >([]);

  const addNewFeature = () => {
    if (!newFeatureName || !newFeatureValue) {
      return;
    }
    setFeatures((prev) => [
      ...prev,
      { name: newFeatureName, value: newFeatureValue },
    ]);
    setNewFeatureName("");
    setNewFeatureValue("");
  };

  const handleFeatureInputsEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewFeature();
    }
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages((prev) => [
      ...prev,
      ...files.map((file, index) => ({
        file,
        id: "item-" + index + 1 + Date.now().toString(),
      })),
    ]);
  };

  const onImageDragEnd: OnDragEndResponder = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    const items = reorder(images, source.index, destination.index);
    setImages(items);
  };

  useEffect(() => {
    form.setValue("features", features.length ? JSON.stringify(features) : "");
  }, [features]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    addApartment(
      {
        title: values.title,
        address: values.address,
        description: values.description,
        features: features.map((feature) => ({
          name: feature.name,
          value: feature.value,
        })),
        files: images.map((image) => image.file),
        price: values.price,
        subtitle: values.subtitle,
      },
      {
        onSuccess(response) {
          if (response) {
            setLCItem(LC_EDITOR_NAME, "");
            form.reset();
            setImages([]);
            setFeatures([]);
            toast.success("Квартира успешно добавлена!");
            // router.push(AuthRoutes.APARTMENTS);
          } else {
            toast.error("Ошибка при добавлении квартиры! Попробуйте еще раз!");
          }
        },
        onError() {
          toast.error("Ошибка при добавлении квартиры! Попробуйте еще раз!");
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl w-full mx-auto space-y-8"
      >
        <h1 className="text-2xl font-bold text-center">Добавить квартиру</h1>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заголовок</FormLabel>
              <FormControl>
                <Input placeholder="Заголовок" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подзаголовок</FormLabel>
              <FormControl>
                <Input placeholder="Подзаголовок" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <p className="text-sm font-medium mb-3">Фотографии</p>
          <DragDropContext onDragEnd={onImageDragEnd}>
            <Droppable droppableId="images-droppable">
              {(provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="mb-5"
                  >
                    {images.map((image, index) => {
                      return (
                        <Draggable
                          key={image.id}
                          draggableId={image.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={cn(
                                "flex items-center justify-between gap-3 py-2 transition-colors select-none",
                                snapshot.isDragging &&
                                  "bg-blue-100/80 border border-dashed border-blue-300",
                              )}
                            >
                              <div className="flex items-center gap-2 text-black/60">
                                <GripVertical />
                                <img
                                  src={URL.createObjectURL(image.file)}
                                  alt={`Uploaded image ${index + 1}`}
                                  className="w-32 h-32 object-cover rounded"
                                />
                              </div>

                              <Button
                                className="cursor-pointer"
                                type="button"
                                variant="ghost"
                                size={"icon"}
                                onClick={() =>
                                  setImages((prev) =>
                                    prev.filter((_, i) => i !== index),
                                  )
                                }
                              >
                                <X />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
          <Button asChild>
            <label>
              Добавить
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={addImage}
              />
            </label>
          </Button>
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <Input placeholder="Адрес" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена</FormLabel>
              <FormControl>
                <Input placeholder="Цена" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <SimpleEditor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="">
          <p className="text-sm font-medium mb-3">Характеристики</p>
          <div className="flex flex-col gap-1">
            {features.map((feature, index) => (
              <>
                <div
                  key={index}
                  className="flex justify-between items-center gap-2 rounded"
                >
                  <div className="flex items-start gap-2 py-4 max-w-[90%]">
                    <span className="font-bold">{feature.name}:</span>
                    <span>{feature.value}</span>
                  </div>

                  <Button
                    className="cursor-pointer ml-10 h-3 w-3"
                    type="button"
                    variant="ghost"
                    size={"icon"}
                    onClick={() =>
                      setFeatures((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    <X />
                  </Button>
                </div>
                {index < features.length - 1 && <Separator />}
              </>
            ))}
            <div className="flex flex-col items-stertch gap-3 bg-secondary p-4 rounded-lg">
              <div className="flex flex-col lg:flex-row gap-3 items-stretch mt-3 lg:mt-0">
                <Input
                  placeholder="Название характеристики"
                  value={newFeatureName}
                  onChange={(e) => setNewFeatureName(e.currentTarget.value)}
                  className="w-full !bg-background lg:w-1/2"
                  type="text"
                  onKeyDown={handleFeatureInputsEnter}
                />
                <Input
                  placeholder="Значение характеристики"
                  value={newFeatureValue}
                  onChange={(e) => setNewFeatureValue(e.currentTarget.value)}
                  className="w-full !bg-background lg:w-1/2"
                  type="text"
                  onKeyDown={handleFeatureInputsEnter}
                />
              </div>
              <Button
                type="button"
                size={"sm"}
                variant={"outline"}
                onClick={addNewFeature}
              >
                Добавить характеристику
              </Button>
            </div>
          </div>
        </div>

        <Button
          className="w-full"
          size={"lg"}
          disabled={isPending}
          type="submit"
        >
          Добавить квартиру
        </Button>
      </form>
    </Form>
  );
};
