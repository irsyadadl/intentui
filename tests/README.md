# Test komponen React Aria

Suite ini menguji komponen lokal di `src/components/ui` menggunakan Vitest,
React Testing Library, `user-event`, dan `@react-aria/test-utils` di JSDOM.

## Menjalankan

```bash
npm test                         # seluruh suite, sekali jalan
npm run test:watch               # ulangi test saat file berubah
npm test -- tests/ui/select.test.tsx
npm test -- -t 'selects an item' # filter nama test
```

## Struktur

```text
vitest.config.mts       # environment, alias @/, dan lokasi test
tests/
  setup.ts            # DOM matchers, cleanup, shim API browser
  utils/render.tsx    # render dengan locale en-US
  ui/*.test.tsx       # satu file per keluarga komponen
```

Nama test mengikuti nama file implementasi. Subkomponen diuji bersama dalam
komposisi pemakaian nyata, misalnya `CheckboxField` + `Checkbox`, atau
`Select` + `SelectTrigger` + `SelectContent` + `SelectItem`.

## Cakupan

68 keluarga komponen: tombol/toggle, input dan field, checkbox/radio/switch,
collections dan selection, menu, dialog/overlay, disclosure, tanggal/waktu,
slider dan kontrol warna, upload/drop zone, toolbar, navigation, progress,
serta komponen gabungan seperti MultipleSelect, TagField, CommandMenu,
Sidebar, Preview, dan Snippet. Untuk Chart, BarList, Leaderboard, dan Tracker,
yang diuji hanya bagian yang memakai React Aria: kontrol legend, tombol baris,
semantik progress, dan tooltip.

Komponen presentasional seperti Badge, Card, Avatar, Container, Skeleton,
Heading, dan Text tidak termasuk. Rendering grafik Recharts, Carousel,
InputOTP, NativeSelect, ScrollArea, dan Toast juga di luar scope.

Test mencakup perilaku utama dan kasus batas yang relevan: perubahan state,
callback, controlled value, disabled/read-only, label/deskripsi/error,
keyboard navigation, dismissal, pemilihan rentang tanggal, filtering,
serialization tag, dan clipboard. Ini bukan klaim coverage 100% untuk
setiap prop, cabang, atau kombinasi subkomponen.

## Menambah test

- Import komponen dari `@/components/ui/...`, bukan menggantinya dengan primitive.
- Gunakan `render` dari `tests/utils/render` agar format tanggal/angka konsisten.
- Cari elemen berdasarkan role dan accessible name. Gunakan test ID untuk root
  tester bila root tidak punya role atau ada beberapa elemen dengan role sama.
- Untuk pola yang tersedia, buat satu `User` React Aria per file, lalu
  `createTester()` per test. Untuk urutan fokus, Escape, outside click, dan
  interaksi yang tidak dicakup tester, gunakan `userEvent` langsung.
- Assertion callback collection mengubah `Selection` menjadi array sebelum
  membandingkan key. `Selection` React Aria dapat memiliki metadata tambahan.
- Gunakan tanggal eksplisit dan real timers. Jika sebuah test perlu fake timers,
  pasang/flush/restore secara lokal dan berikan `advanceTimer` pada tester.
- Mock hanya batas browser yang diperlukan. Komponen React Aria, state, dan
  event handling tetap asli. DropZone memakai payload DataTransfer sintetis;
  EyeDropper memakai hasil API sintetis.

JSDOM tidak memverifikasi layout, warna, animasi, ukuran, responsive CSS,
scrolling, drag geometry, atau integrasi native file picker/EyeDropper.
Slider/kontrol warna saat ini diuji lewat keyboard. Browser/visual tests
masih diperlukan untuk aspek-aspek tersebut dan audit aksesibilitas manual.
