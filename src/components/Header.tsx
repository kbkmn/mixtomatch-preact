type HeaderProps = {
  level: number;
  lives: number;
};

const Header = ({ level, lives }: HeaderProps) => {
  return (
    <header class="z-10">
      <div class="flex justify-between ">
        <div>Level {level}</div>

        <div>{[...Array(lives)].map((_) => "🖌️")} Brushes</div>
      </div>

      <h1 class="mb-[0.4em] mt-[0.6em] text-center text-[1.4em] font-medium">
        Can You Mix the Exact Color?
      </h1>

      <nav class="text-center">
        <a href="/color-theory.html" class="underline hover:no-underline">
          🙋 Learn about Color Theory
        </a>
      </nav>
    </header>
  );
};

export default Header;
