# Sebastian Świderski - Web - Wrocław

## Ocado Technology - Web Internship Task

## [🔗 Live Demo](https://xeo3221.github.io/Sebastian_Swiderski_Web_Wroclaw/)

Prosta aplikacja sklepu internetowego zbudowana w React i TypeScript, demonstrująca podstawowe funkcjonalności e-commerce.

## 🌟 Funkcjonalności

- Wyświetlanie listy produktów
- Dodawanie produktów do koszyka
- Modyfikacja ilości produktów w koszyku (limit 99 sztuk)
- Usuwanie produktów z koszyka
- Podsumowanie zamówienia
- Potwierdzenie zamówienia
- Persystencja danych w localStorage
- Responsywny design
- Interfejs w języku polskim

## 🚀 Technologie

- React 18
- TypeScript
- Tailwind CSS
- React Router

## 📦 Struktura projektu

```
src/
  ├── components/     # Komponenty React
  ├── context/        # Kontekst aplikacji (CartContext)
  ├── hooks/          # Hooki React
  ├── types/          # Definicje TypeScript
  ├── utils/          # Funkcje pomocnicze
  └── App.tsx         # Główny komponent aplikacji
```

## 📝 Założenia projektowe

1. **Persystencja danych**

   - Koszyk zapisywany w localStorage
   - Ostatnie zamówienie zapisywane w localStorage
   - Walidacja przy dodawaniu i modyfikacji ilości

2. **Obsługa błędów**

   - Walidacja wprowadzanych danych
   - Komunikaty błędów dla użytkownika
   - Obsługa błędów localStorage

3. **UX/UI**
   - Responsywny design
   - Intuicyjna nawigacja
   - Czytelne komunikaty
   - Dostępność (aria-labels)

## 🎨 Design
![Screenshot 2025-05-11 at 18 31 27](https://github.com/user-attachments/assets/18af5fc3-9ced-4451-af52-c4b36469064e)
![Screenshot 2025-05-11 at 18 31 12](https://github.com/user-attachments/assets/24d5c015-f40d-45ae-8d87-dde9c6fc0fed)
![Screenshot 2025-05-11 at 18 31 48](https://github.com/user-attachments/assets/f8a744e8-1984-4815-873a-f1924e8b8311)
![Screenshot 2025-05-11 at 18 32 03](https://github.com/user-attachments/assets/42f2353a-183e-486b-a2c9-20bd7c182235)

## Instalacja i uruchomienie

1. Sklonuj repozytorium:

```bash
git clone https://github.com/xeo3221/Sebastian_Swiderski_Web_Wroclaw.git
cd Sebastian_Swiderski_Web_Wroclaw
```

2. Zainstaluj zależności:

```bash
npm install
```

3. Uruchom aplikację w trybie deweloperskim:

```bash
npm run dev
```

4. Otwórz przeglądarkę i przejdź pod adres:

```
http://localhost:5173
```

## Skrypty npm

- `npm run dev` - uruchamia serwer deweloperski
- `npm run build` - buduje aplikację do produkcji
- `npm run preview` - podgląd zbudowanej aplikacji
- `npm run lint` - uruchamia linter
- `npm run type-check` - sprawdza typy TypeScript

## Testowanie

Aplikacja została przetestowana pod kątem:

- Poprawności działania funkcjonalności
- Responsywności na różnych urządzeniach
- Obsługi błędów
- Dostępności
- Wydajności

## 🔮 Przyszłe usprawnienia

- Dodanie testów jednostkowych
- Implementacja systemu autentykacji
- Dodanie wyszukiwarki produktów
- Implementacja systemu promocji
- Dodanie historii zamówień
