import Image from "next/image";

interface ProfileHeaderProps {
  name: string;
  bio: string;
  avatar: string;
}

/** Profile avatar, name, and bio — the identity block at the top of the page */
export default function ProfileHeader({ name, bio, avatar }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Avatar with subtle ring */}
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/40 to-purple-500/30 blur-md" />
        <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/10 ring-offset-2 ring-offset-bg-primary">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
            sizes="96px"
            priority
          />
        </div>
      </div>

      <h1 className="text-xl font-bold text-text-primary tracking-tight">
        {name}
      </h1>
      <p className="text-sm text-text-secondary mt-1 max-w-[280px] leading-relaxed">
        {bio}
      </p>
    </div>
  );
}
