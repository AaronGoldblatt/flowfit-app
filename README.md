# FlowFit - Cycle-Synced Fitness App

FlowFit is a full-stack fitness tracking application that provides personalized workout recommendations based on menstrual cycle phases or pregnancy trimester. Built with Next.js, PostgreSQL, Drizzle ORM, and BetterAuth.

## Features

- 🔐 **Authentication** - Secure email/password authentication with BetterAuth
- 👤 **User Profiles** - Customizable profiles with fitness goals and preferences
- 🌙 **Cycle Tracking** - Track menstrual cycle phases with symptom logging
- 🤰 **Pregnancy Mode** - Specialized tracking for pregnancy trimesters
- 💪 **Workout Recommendations** - Phase-based workout suggestions
- 📊 **Progress Tracking** - Log and visualize workout history
- 🍎 **Nutrition Logging** - Track meals and nutrition goals
- 📈 **Insights & Statistics** - View trends and progress over time

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js Server Actions, Drizzle ORM, PostgreSQL
- **Authentication**: BetterAuth
- **Validation**: Zod
- **Deployment**: Vercel (Frontend), Neon (Database)
- **Development**: Docker (Local Postgres), pnpm

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Docker Desktop (for local database)
- A Neon account (for production database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd flowfit-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Generate a secret for BetterAuth:
   ```bash
   pnpm dlx @better-auth/cli@latest secret
   ```

   Update `.env` with your values:
   ```env
   # BetterAuth
   BETTER_AUTH_SECRET="<your-generated-secret>"
   BETTER_AUTH_URL="http://localhost:3000"

   # Local Database
   LOCAL_DATABASE_URL="postgresql://postgres:postgres@localhost:5432/flowfit"

   # Production Database (from Neon)
   DATABASE_URL="<your-neon-connection-string>"
   ```

4. **Start the local database**
   ```bash
   pnpm db:start
   ```

5. **Generate BetterAuth schema**
   ```bash
   pnpm auth:generate
   ```

6. **Generate and run database migrations**
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

7. **Seed the database with workout templates**
   ```bash
   pnpm db:seed
   ```

8. **Start the development server**
   ```bash
   pnpm dev
   ```

9. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Management

### Local Development

```bash
# Start PostgreSQL container
pnpm db:start

# Stop PostgreSQL container
pnpm db:stop

# Delete PostgreSQL data (fresh start)
pnpm db:delete

# View database in Drizzle Studio
pnpm db:studio
```

### Schema Changes

```bash
# 1. Generate BetterAuth schema (after auth config changes)
pnpm auth:generate

# 2. Generate SQL migrations from schema
pnpm db:generate

# 3. Apply migrations to local database
pnpm db:migrate

# 4. Apply migrations to production database
pnpm db:migrate-production
```

## Deployment

### Deploying to Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure project settings (auto-detected for Next.js)

3. **Set up Neon Database**
   - Create a new project on [neon.tech](https://neon.tech)
   - Copy the connection string
   - Add it as `DATABASE_URL` in Vercel environment variables

4. **Set environment variables in Vercel**
   ```
   BETTER_AUTH_SECRET=<your-secret>
   BETTER_AUTH_URL=https://your-app.vercel.app
   DATABASE_URL=<your-neon-connection-string>
   ```

5. **Run migrations on production database**
   
   After setting up the production database URL in your local `.env`:
   ```bash
   pnpm db:migrate-production
   pnpm db:seed  # Optional: seed workout templates
   ```

6. **Deploy**
   
   Vercel will automatically deploy on push to your main branch.

## Project Structure

```
flowfit-app/
├── app/                      # Next.js App Router
│   ├── api/
│   │   └── auth/            # BetterAuth API routes
│   ├── auth/                # Authentication pages
│   ├── onboarding/          # Onboarding flow
│   ├── dashboard/           # Main dashboard
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   └── ...                  # Feature components
├── actions/                 # Server actions
│   ├── profile.ts
│   ├── cycles.ts
│   ├── workouts.ts
│   └── nutrition.ts
├── database/                # Database configuration
│   ├── schema/              # Drizzle schemas
│   ├── migrations/          # SQL migrations
│   ├── index.ts             # Database connection
│   └── seed.ts              # Seed data
├── lib/                     # Utility libraries
│   ├── auth.ts              # BetterAuth server config
│   ├── auth-client.ts       # BetterAuth client hooks
│   ├── server-auth.ts       # Server-side auth helpers
│   ├── cycle-utils.ts       # Cycle calculation utilities
│   └── utils.ts             # General utilities
├── middleware.ts            # Next.js middleware (auth)
├── drizzle.config.ts        # Drizzle configuration
├── docker-compose.yml       # Local PostgreSQL setup
└── package.json             # Dependencies and scripts
```

## API Documentation

### Server Actions

All server actions are located in the `actions/` directory and can be imported and used in client components:

#### Profile Actions
- `createProfile(data)` - Create user profile
- `getProfile()` - Get current user's profile
- `updateProfile(data)` - Update profile
- `deleteProfile()` - Delete profile

#### Cycle Actions
- `upsertCycle(data)` - Create or update cycle data
- `getCurrentCycle()` - Get active cycle
- `createSymptomLog(data)` - Log symptoms
- `getSymptomLogs(limit)` - Get symptom history
- `deleteSymptomLog(id)` - Delete a symptom log

#### Workout Actions
- `getRecommendedWorkouts(phase, fitnessLevel, trimester)` - Get workout recommendations
- `logWorkout(data)` - Log a completed workout
- `getWorkoutLogs(limit)` - Get workout history
- `getWorkoutStats(days)` - Get workout statistics
- `deleteWorkoutLog(id)` - Delete a workout log

#### Nutrition Actions
- `createNutritionLog(data)` - Log a meal
- `getNutritionLogs(limit)` - Get nutrition history
- `getNutritionLogsByDate(date)` - Get meals for a specific date
- `upsertNutritionGoals(data)` - Set nutrition goals
- `getNutritionGoals()` - Get nutrition goals
- `getNutritionStats(date)` - Get daily nutrition stats

## Development Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors

# Database
pnpm db:start     # Start local PostgreSQL
pnpm db:stop      # Stop local PostgreSQL
pnpm db:delete    # Delete database data
pnpm db:generate  # Generate migrations
pnpm db:migrate   # Run migrations (local)
pnpm db:migrate-production  # Run migrations (production)
pnpm db:studio    # Open Drizzle Studio
pnpm db:seed      # Seed database

# Authentication
pnpm auth:generate  # Generate BetterAuth schema
```

## Features Overview

### Cycle Phase Tracking

The app calculates cycle phases based on:
- Last period date
- Average cycle length (default: 28 days)
- Period length (default: 5 days)

**Phases:**
1. **Menstrual** (Days 1-5): Low energy, gentle workouts
2. **Follicular** (Days 6-13): Rising energy, high-intensity workouts
3. **Ovulation** (Days 14-16): Peak energy, maximum performance
4. **Luteal** (Days 17-28): Moderate energy, steady workouts

### Workout Recommendations

Workouts are recommended based on:
- Current cycle phase or pregnancy trimester
- Fitness level (beginner, intermediate, advanced)
- Personal goals

### Pregnancy Mode

Supports all three trimesters with:
- Safe, trimester-specific workouts
- Modified exercises
- Educational content

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Authentication by [BetterAuth](https://www.better-auth.com/)
- Database ORM by [Drizzle](https://orm.drizzle.team/)
# Deployment trigger
