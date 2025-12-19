import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Test, TestingModule } from "@nestjs/testing";

import { AiService } from "../ai/ai.service";
import { DbService } from "../db/db.service";
import { FilesService } from "../files/files.service";
import { dbServiceMock } from "./../../test/setup";
import { ApartmentsService } from "./apartments.service";
import { CreateApartmentDto } from "./dto/create-apartment.dto";

describe("ApartmentsService", () => {
  let service: ApartmentsService;
  let dbService: DbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApartmentsService,
        {
          provide: DbService,
          useValue: dbServiceMock,
        },
        {
          provide: FilesService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: AiService,
          useValue: {
            ask: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ApartmentsService>(ApartmentsService);
    dbService = module.get<DbService>(DbService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create an apartment", async () => {
    const apartmentDto: CreateApartmentDto = {
      title: "Cozy Apartment",
      description: "A nice and cozy apartment in the city center.",
      price: "1200",
    };

    const createdApartment = await service.create("1", [], apartmentDto);

    expect(dbService.apartment.create).toHaveBeenCalled();
  });
});
