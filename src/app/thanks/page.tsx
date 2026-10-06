import { createMetadata } from "@/lib/metadata"
import { CheckIcon } from "@heroicons/react/20/solid"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"

export const metadata = createMetadata({
  title: "Thank you for supporting Intent UI",
  description:
    "Your sponsorship helps keep Intent UI growing. Thank you for supporting new components, better documentation, and ongoing maintenance.",
  path: "/thanks",
})
export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <div className="text-center">
          <div className="mb-4 grid place-content-center">
            <div className="bg-success-subtle grid size-10 place-content-center rounded-full">
              <CheckIcon className="text-success size-5" />
            </div>
          </div>
          <Heading>
            Thanks for backing <span className="bg-blue-600 px-1 rounded-md">Intent UI</span>
          </Heading>
          <Text className="mt-2">
            Your support means a lot. It helps me keep building new components, improving the docs,
            and making Intent UI better over time.
          </Text>
        </div>
      </div>
    </div>
  )
}
