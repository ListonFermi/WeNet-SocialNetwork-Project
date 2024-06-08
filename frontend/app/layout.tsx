import StoreProvided from "@/components/redux/StoreProvided";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvided>
      <html lang="en">
        <body>{children}</body>
      </html>
    </StoreProvided>
  );
}
