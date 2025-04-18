import '../globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Decentralized Hiring Platform" />
        <title>Decentralized Hiring Platform</title>
      </head>
      <body className="font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
