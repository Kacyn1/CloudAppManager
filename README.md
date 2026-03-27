# Cloud Task Manager - Książka Azure w Praktyce by Mateusz Kacyna, 100 397
 
Projekt natywnej aplikacji chmurowej realizowany w architekturze 3-warstwowej.
 
## Deklaracja Architektury (Mapowanie Azure)
Ten projekt został zaplanowany z myślą o usługach PaaS (Platform as a Service) w chmurze Azure.
 
| Warstwa | Komponent Lokalny | Usługa Azure |
| :--- | :--- | :--- |
| **Presentation** | React 19 (Vite) | Azure Static Web Apps |
| **Application** | API (.NET 9 / Node 24) | Azure App Service |
| **Data** | SQL Server (Dev) | Azure SQL Database (Serverless) |
 
## 🏗 Status Projektu i Dokumentacja
* [x] **Artefakt 1:** Zaplanowano strukturę folderów i diagram C4 (dostępny w `/docs`).
* [x] **Artefakt 2:** Konfiguracja środowiska Docker (w trakcie...).
* [x] **Artefakt 3:** Działająca warstwa prezentacji. 
* [x] **Artefakt 4:** Działający backend + frontend(nietrwałe połączenie z bazą). 
* [x] **Artefakt 5:** Update artefaktu 5 na zajęciach.
* [x] **Artefakt 6:** Wdrożenie na azure frontendu i backendu w domu po cięzkim boju.
> **Informacja:** Ten plik będzie ewoluował. W kolejnych etapach dodamy tutaj sekcje 'Quick Start', opis zmiennych środowiskowych oraz instrukcję wdrożenia (CI/CD).
