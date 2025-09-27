import nextServer from "./api";
import { 
  DiaryEntry, 
  CreateDiaryEntryData, 
  UpdateDiaryEntryData 
} from "@/components/Diary/Diary.types";

// Можливі варіанти endpoints
const POSSIBLE_ENDPOINTS = [
  '/diaries',
  '/diary',
  '/api/diaries',
  '/api/diary',
  '/v1/diaries',
  '/v1/diary'
];

// Кеш для збереження робочого endpoint
let workingEndpoint: string | null = null;

// Функція для тестування всіх можливих endpoints
const findWorkingEndpoint = async (): Promise<string | null> => {
  if (workingEndpoint) {
    return workingEndpoint;
  }

  console.log('🔍 Testing all possible endpoints...');
  
  for (const endpoint of POSSIBLE_ENDPOINTS) {
    try {
      console.log(`Testing ${endpoint}...`);
      const response = await nextServer.get(endpoint, { timeout: 3000 });
      console.log(`✅ ${endpoint} works! Status: ${response.status}`);
      workingEndpoint = endpoint;
      return endpoint;
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { status?: number }; message?: string };
        console.log(`${endpoint}: ${err.response?.status || err.message}`);
      } else {
        console.log(`${endpoint}: Unknown error`);
      }
    }
  }
  
  console.log('No working endpoint found');
  return null;
};

// Перевірка доступності сервера без credentials
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER || "https://leleka-backend-1.onrender.com/api";
    
    // Спробуємо звичайний fetch без credentials
    const response = await fetch(`${baseUrl}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000) // 10 секунд таймаут
    });
    
    console.log(`Health check response: ${response.status}`);
    return response.ok;
  } catch (error) {
    console.log('Server health check failed:', error);
    return false;
  }
};

// Спрощена версія API без credentials для тестування
const testApiConnection = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER || "https://leleka-backend-1.onrender.com";
    
    // Тестуємо різні варіанти базового URL
    const testUrls = [
      `${baseUrl}/api`,
      baseUrl,
      `${baseUrl}/v1`
    ];
    
    for (const url of testUrls) {
      try {
        console.log(`Testing base URL: ${url}`);
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(5000)
        });
        
        console.log(`${url} - Status: ${response.status}`);
        if (response.ok) {
          return url;
        }
      } catch (err) {
        console.log(`${url} failed:`, err);
      }
    }
  } catch (error) {
    console.error('API connection test failed:', error);
  }
  return null;
};

// Отримати всі записи щоденника з fallback логікою
export const getDiaryEntries = async (): Promise<DiaryEntry[]> => {
  try {
    console.log('Fetching diary entries...');
    
    // Спершу тестуємо з'єднання
    await testApiConnection();
    
    // Знаходимо робочий endpoint
    const endpoint = await findWorkingEndpoint();
    
    if (!endpoint) {
      throw new Error('No working API endpoint found');
    }
    
    console.log(`Using endpoint: ${endpoint}`);
    const response = await nextServer.get(endpoint);
    
    console.log('Diary entries fetched successfully:', response.data);
    
    return response.data.data || response.data || [];
  } catch (error: unknown) {
    console.error('Error fetching diary entries:', error);

    // Детальна інформація про помилку
    if (typeof error === 'object' && error !== null && 'response' in error) {
      interface ErrorResponse {
        response?: {
          status?: number;
          statusText?: string;
          data?: unknown;
          headers?: unknown;
        };
        message?: string;
        request?: unknown;
        code?: unknown;
        config?: { url?: string };
      }
      const err = error as ErrorResponse;
      console.error('Response error details:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        headers: err.response?.headers
      });
    } else if (typeof error === 'object' && error !== null && 'request' in error) {
      const err = error as { message?: string; code?: unknown; config?: { url?: string } };
      console.error('Request error details:', {
        message: err.message,
        code: err.code,
        config: err.config?.url
      });
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      const err = error as { message?: string };
      console.error('General error:', err.message);
    } else {
      console.error('General error:', error);
    }

    // Кидаємо помилку для обробки в компонентах
    const errorMessage = typeof error === 'object' && error !== null && 'message' in error
      ? (error as { message?: string }).message
      : String(error);
    throw new Error(`Не вдалося завантажити записи щоденника: ${errorMessage}`);
  }
};

// Отримати запис за ID
export const getDiaryEntry = async (id: string): Promise<DiaryEntry> => {
  try {
    console.log(`Fetching diary entry with ID: ${id}`);
    
    const endpoint = await findWorkingEndpoint();
    if (!endpoint) {
      throw new Error('No working API endpoint found');
    }
    
    const response = await nextServer.get(`${endpoint}/${id}`);
    console.log(`Diary entry ${id} fetched successfully`);
    return response.data.data || response.data;
  } catch (error: unknown) {
    console.error(`Error fetching diary entry ${id}:`, error);
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message
        : String(error);
    throw new Error(`Не вдалося завантажити запис: ${errorMessage}`);
  }
};

// Створити новий запис
export const createDiaryEntry = async (data: CreateDiaryEntryData): Promise<DiaryEntry> => {
  try {
    console.log('Creating new diary entry:', data);
    
    const endpoint = await findWorkingEndpoint();
    if (!endpoint) {
      throw new Error('No working API endpoint found');
    }
    
    const response = await nextServer.post(endpoint, data);
    console.log('Diary entry created successfully');
    return response.data.data || response.data;
  } catch (error: unknown) {
    console.error('Error creating diary entry:', error);
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message
        : String(error);
    throw new Error(`Не вдалося створити запис: ${errorMessage}`);
  }
};

// Оновити існуючий запис
export const updateDiaryEntry = async (
  id: string, 
  data: UpdateDiaryEntryData
): Promise<DiaryEntry> => {
  try {
    console.log(`Updating diary entry ${id}:`, data);
    
    const endpoint = await findWorkingEndpoint();
    if (!endpoint) {
      throw new Error('No working API endpoint found');
    }
    
    const response = await nextServer.patch(`${endpoint}/${id}`, data);
    console.log(`Diary entry ${id} updated successfully`);
    return response.data.data || response.data;
  } catch (error: unknown) {
    console.error(`Error updating diary entry ${id}:`, error);
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message
        : String(error);
    throw new Error(`Не вдалося оновити запис: ${errorMessage}`);
  }
};

// Видалити запис
export const deleteDiaryEntry = async (id: string): Promise<void> => {
  try {
    console.log(` Deleting diary entry ${id}`);
    
    const endpoint = await findWorkingEndpoint();
    if (!endpoint) {
      throw new Error('No working API endpoint found');
    }
    
    await nextServer.delete(`${endpoint}/${id}`);
    console.log(`Diary entry ${id} deleted successfully`);
  } catch (error: unknown) {
    console.error(`Error deleting diary entry ${id}:`, error);
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message
        : String(error);
    throw new Error(`Не вдалося видалити запис: ${errorMessage}`);
  }
};