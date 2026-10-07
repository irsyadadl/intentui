"use client"

import { CheckIcon } from "@heroicons/react/20/solid"
import { PageContainer } from "@/components/page-container"
import { buttonStyles } from "@/components/ui/button"
import { Strong } from "@/components/ui/text"
import json from "@/json/sponsors.json"

interface SponsorPlanPrice {
  amount: number
  currency: string
  interval: string
}

interface SponsorPlanItem {
  id: string
  name: string
  price: SponsorPlanPrice
  description: string
  benefits: {
    title: string
    description: string
  }[]
  checkout_url: string
  type: "individual" | "company"
}

const plans = json as SponsorPlanItem[]
const individualPlans = plans.filter((i) => i.type === "individual")
const companyPlans = plans.filter((i) => i.type !== "individual")
const sponsorButton = buttonStyles({
  isCircle: true,
  intent: "primary",
  size: "lg",
  // className: "bg-foreground hover:bg-foreground/90 text-bg",
})

export function SponsorPlan() {
  return (
    <div className="-mb-px [--border:var(--color-muted-foreground)]/18 [--gutter:--spacing(6)]">
      <div className="border-y border-page bg-muted">
        <div className="border-b border-page">
          <PageContainer>
            <div className="border-x border-muted-foreground/30 bg-background p-(--gutter)">
              <h3 className="font-semibold text-2xl text-foreground tracking-tight">Individual</h3>
            </div>
          </PageContainer>
        </div>
        <PageContainer>
          <div className="grid grid-cols-1 divide-y border-x border-page divide-page sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {individualPlans.map((plan) => (
              <div key={plan.id} className="flex flex-col bg-background p-(--gutter) gap-y-6">
                <div>
                  <div className="text-base/6 mb-4">{plan.name}</div>

                  <div className="text-3xl tabular-nums tracking-tight">
                    ${plan.price.amount}
                    <span className="ml-1 font-normal text-base text-muted-foreground">
                      {plan.id === "o-sponsor" ? "one time" : "/ month"}
                    </span>
                  </div>
                </div>

                <a href={plan.checkout_url} className={sponsorButton}>
                  {plan.id === "o-sponsor"
                    ? "Become a sponsor"
                    : `Become ${plan.name === "Ambassador" ? "an" : "a"} ${plan.name.toLowerCase()}`}
                </a>
              </div>
            ))}
          </div>
        </PageContainer>
      </div>

      <div className="bg-muted">
        <PageContainer>
          <div className="border-x border-muted-foreground/30 bg-background p-(--gutter)">
            <h3 className="mt-6 sm:mt-12 font-semibold text-2xl text-foreground tracking-tight">
              Company
            </h3>
          </div>
        </PageContainer>
      </div>

      <div className="border-y bg-muted">
        <PageContainer>
          <div className="grid grid-cols-1 divide-y border-x sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {companyPlans.map((plan) => (
              <div key={plan.id} className="flex flex-col bg-background p-(--gutter) gap-y-6">
                <div className="text-base/6">{plan.name}</div>
                <div className="-mt-2 text-3xl tabular-nums tracking-tight">
                  ${plan.price.amount}
                  <span className="ml-1 font-normal text-base text-muted-foreground">/ month</span>
                </div>
                <a href={plan.checkout_url} className={sponsorButton}>
                  Become {plan.name === "Ambassador" ? "an" : "a"} {plan.name.toLowerCase()}
                </a>
                {plan.benefits.length ? (
                  <ul className="space-y-4 text-sm/6">
                    {plan.benefits.map((benefit) => (
                      <li key={benefit.title} className="flex gap-x-3">
                        <CheckIcon className="h-lh w-4 shrink-0 text-primary-subtle-foreground" />
                        <p className="text-pretty">
                          <Strong>{benefit.title}</Strong>{" "}
                          <span className="text-muted-foreground">{benefit.description}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            <div className="flex flex-col bg-background p-(--gutter) gap-y-6">
              <div className="text-base/6">Custom</div>
              <div className="text-3xl tabular-nums tracking-tight -mt-2">---</div>

              <a
                target="_blank"
                href="mailto:partners@intentui.com?subject=Parnert inquiry"
                className={sponsorButton}
              >
                Get in touch
              </a>
              <ul className="space-y-4 text-sm/6">
                {plans
                  .find((plan) => plan.id === "partner")
                  ?.benefits.map((benefit) => (
                    <li key={benefit.title} className="flex gap-x-3">
                      <CheckIcon className="h-lh w-4 shrink-0 text-primary-subtle-foreground" />
                      <p className="text-pretty">
                        <Strong>{benefit.title}</Strong>{" "}
                        <span className="text-muted-foreground">{benefit.description}</span>
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </PageContainer>
        <div className="border-t">
          <PageContainer>
            <div className="border-x p-4 text-center text-sm/6">
              Looking for a one-time sponsorship instead?{" "}
              <a
                href="mailto:partners@intentui.com?subject=One-time sponsorship inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-subtle-foreground underline decoration-primary-subtle-foreground/50 hover:decoration-primary-subtle-foreground"
              >
                Get in touch
              </a>{" "}
              and we&apos;ll work something out.
            </div>
          </PageContainer>
        </div>
      </div>
    </div>
  )
}
