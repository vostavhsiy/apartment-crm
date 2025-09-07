"use client";

import { ToggleClientToCollectionResponse } from "@/entities/client/api/api";
import {
  useCreateClient,
  useFindClientsForUser,
  useToggleClientToCollection,
} from "@/entities/client/api/hooks";
import { ClientWithRelations } from "@/entities/client/model/client-with-relations";
import { CollectionWithRelations } from "@/entities/collection/model/collection-with-relations";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { useIsMobile } from "@/shared/lib/hooks/use-mobile";
import { useGlobalStore } from "@/shared/lib/store/global.store";
import { cn, copyToClipboard } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Heading } from "@/shared/ui/heading";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Spinner } from "@/shared/ui/spinner";
import { Copy, Eye, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

import { FC, useState } from "react";

import { ClientMessageLinkButton } from "../client-message-link-button/client-message-link-button";
import { CollectionToClientItem } from "./collection-to-client-item";

interface Props {
  collection: CollectionWithRelations;
}

export const CollectionToClientDialog: FC<Props> = ({ collection }) => {
  const { setGlobalPending } = useGlobalStore();

  const isMobile = useIsMobile();

  const [search, setSearch] = useState("");
  const [debounsedSearch] = useDebounce(search, 300);

  const [selectedClient, setSelectedClient] =
    useState<ClientWithRelations | null>(null);

  const [createdCollectionToClient, setCreatedCollectionToClient] =
    useState<ToggleClientToCollectionResponse | null>(null);

  const {
    data: clientData,
    isPending,
    ref,
    hasNextPage,
    isFetchingNextPage,
  } = useFindClientsForUser({
    search: debounsedSearch,
  });

  const { mutate: toggleCollectionToClient, isPending: isTogglePending } =
    useToggleClientToCollection();

  const { mutate: createClient, isPending: isCreatePending } =
    useCreateClient();

  const isConnected = selectedClient?.collectionsLinks.some(
    (link) => link.collectionId === collection.id,
  );

  const [name, phone] = [
    debounsedSearch.split(" ").slice(0, -1).join(" "),
    debounsedSearch.split(" ").at(-1),
  ];

  const handleToggle = (clientId?: string) => {
    if (!clientId) return;
    if (isConnected) return;
    toggleCollectionToClient(
      {
        id: clientId,
        dto: {
          collectionId: collection.id,
          connect: true,
        },
      },
      {
        onSuccess: (data) => {
          setSearch("");
          setSelectedClient(null);
          setCreatedCollectionToClient(data);
          setGlobalPending(false);
        },
        onError: () => {
          toast.error(
            "Ошибка при отправке подборки клиенту! Попробуйте еще раз.",
          );
          setGlobalPending(false);
        },
      },
    );
  };

  const handleToggleClick = (withNewClient?: boolean, clientId?: string) => {
    setGlobalPending(true);

    if (withNewClient) {
      const phoneRegex = /^\+?\d{10,15}$/;
      const clientPhone =
        phone && phoneRegex.test(phone.replace(/[^\d\+]/g, "")) ? phone : "";
      const clientName = clientPhone
        ? name
        : [name, phone].filter(Boolean).join(" ");
      createClient(
        {
          name: clientName,
          phone: clientPhone || "",
        },
        {
          onSuccess: (data) => {
            handleToggle(data.id);
          },
          onError: (error) => {
            //@ts-ignore
            const message = error.response?.data?.message;
            toast.error(
              message ||
                'Ошибка при добавлении клиента! Попробуйте добавить клиента в разделе "Клиенты".',
            );
            setGlobalPending(false);
          },
        },
      );
    } else {
      if (!clientId) return;
      const clientLink = collection.clientsLinks.find(
        (link) => link.clientId === clientId,
      );
      if (clientLink && selectedClient) {
        setCreatedCollectionToClient({
          ...clientLink,
          client: {
            id: selectedClient.id,
            name: selectedClient.name,
            phone: selectedClient.phone,
            userId: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            avatarUrl: "",
          },
          collection,
        });
        setGlobalPending(false);
        return;
      }
      handleToggle(clientId);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setSearch("");
            setSelectedClient(null);
            setCreatedCollectionToClient(null);
          }, 300);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button type="button">Отправить клиенту</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col overflow-hidden">
        {createdCollectionToClient && (
          <>
            <DialogTitle>Отправьте ссылку клиенту!</DialogTitle>
            <p className="text-center">
              Объекты добавлены в кабинет клиента{" "}
              <Link
                href={AuthRoutes.DASHBOARD_CLIENT(
                  createdCollectionToClient.clientId,
                )}
                className="text-blue-600"
              >
                «{createdCollectionToClient.client.name}{" "}
                {createdCollectionToClient.client.phone}»
              </Link>
              . Отправьте ему постоянную ссылку на подборку
            </p>
            <div className="border rounded-md p-2 flex items-center justify-between gap-2">
              <div className="flex flex-col max-[425px]:w-[70%] w-full">
                <span className="block text-sm text-muted-foreground truncate">
                  Постоянная ссылка для клиента
                </span>
                <input
                  type="text"
                  value={PublicRoutes.CLIENT_COLLECTION(
                    createdCollectionToClient.id,
                  )}
                  readOnly
                />
              </div>
              <Button
                className="shrink-0"
                size={isMobile ? "icon" : "default"}
                onClick={() => {
                  copyToClipboard(
                    PublicRoutes.CLIENT_COLLECTION(
                      createdCollectionToClient.id,
                    ),
                  );
                }}
              >
                {isMobile ? <Copy /> : "Копировать"}
              </Button>
            </div>
            <Button
              asChild
              className="bg-blue-600/10 dark:bg-blue-600/60 text-blue-600 dark:text-white hover:bg-blue-600/20 dark:hover:bg-blue-600/40"
            >
              <Link
                target="_blank"
                href={PublicRoutes.CLIENT_COLLECTION(
                  createdCollectionToClient.id,
                )}
              >
                <Eye />
                Посмотреть, что увидит клиент
              </Link>
            </Button>
            <div className="flex flex-col gap-2 items-center mt-5">
              <p className="text-sm text-muted-foreground">
                Другие способы отправки
              </p>
              <div className="flex items-center gap-2 justify-center">
                <ClientMessageLinkButton
                  user={createdCollectionToClient.collection.user}
                  collectionLink={PublicRoutes.CLIENT_COLLECTION(
                    createdCollectionToClient.id,
                  )}
                  linkType="whatsapp"
                />
                <ClientMessageLinkButton
                  user={createdCollectionToClient.collection.user}
                  collectionLink={PublicRoutes.CLIENT_COLLECTION(
                    createdCollectionToClient.id,
                  )}
                  linkType="telegram"
                />
                <ClientMessageLinkButton
                  user={createdCollectionToClient.collection.user}
                  collectionLink={PublicRoutes.CLIENT_COLLECTION(
                    createdCollectionToClient.id,
                  )}
                  linkType="email"
                />
              </div>
            </div>
          </>
        )}
        {!createdCollectionToClient && (
          <>
            <DialogTitle>Отправить подборку клиенту</DialogTitle>
            <Label className="flex-col items-start font-normal">
              <span>Введите имя и номер телефона клиента</span>
              <Input
                value={search}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  setSearch(value);
                  if (value) setSelectedClient(null);
                }}
                placeholder="Иванов Иван 89998887776"
              />
            </Label>
            <div
              className={cn(
                "flex flex-col gap-3 h-80 overflow-auto border p-3 rounded-md",
                (selectedClient || name || phone) && "pb-16",
              )}
            >
              {isPending && <Spinner />}
              {!isPending &&
                !!clientData?.pages?.[0]?.data.length &&
                clientData?.pages
                  ?.flatMap((page) => page.data)
                  .map((client) => {
                    return (
                      <CollectionToClientItem
                        key={client.id}
                        collection={collection}
                        client={client}
                        selectedClient={selectedClient}
                        onSelect={setSelectedClient}
                      />
                    );
                  })}
              {!isPending && !clientData?.pages?.[0]?.data.length && (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <Heading asChild size={"h2"}>
                    <p>Клиентов не найдено!</p>
                  </Heading>
                  <p className="text-sm text-center">
                    Новый клиент добавиться автоматически, если вы правильно
                    ввели его имя и номер телефона в поиске.
                  </p>
                </div>
              )}
              {isFetchingNextPage && (
                <div className="mt-5">
                  <Spinner />
                </div>
              )}
              {hasNextPage && !isFetchingNextPage && (
                <div ref={ref} className="h-10" />
              )}
            </div>
            <div
              className={cn(
                "w-full absolute left-0 bottom-0 translate-y-full transition-transform ease-in-out duration-300 p-6 bg-background shadow-2xl",
                (selectedClient || name || phone) && "translate-y-0",
              )}
            >
              {selectedClient && (
                <Button
                  className="block w-full truncate"
                  disabled={isTogglePending}
                  type="button"
                  onClick={() => handleToggleClick(false, selectedClient.id)}
                >
                  Выбрать клиента «{selectedClient.name} {selectedClient.phone}»
                </Button>
              )}
              {!selectedClient && (name || phone) && (
                <Button
                  className="w-full"
                  type="button"
                  onClick={() => handleToggleClick(true)}
                  disabled={isCreatePending || isTogglePending}
                >
                  <Plus className="mr-2 shrink-0" />
                  <span className="truncate">
                    Добавить клиента «{name} {phone}»
                  </span>
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
