import StoreProvided from "@/components/redux/StoreProvided";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StoreProvided>
        <body>{children}</body>
      </StoreProvided>
    </html>
  );
}
