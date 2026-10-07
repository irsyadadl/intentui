import { tv } from "tailwind-variants"

const styles = tv({
  slots: {
    box: "flex flex-wrap justify-around gap-4",
    item: [
      "grid size-8 cursor-default place-content-center rounded-md text-foreground/80 sm:size-14",
      "focus:bg-primary focus:text-primary-foreground focus:outline-hidden",
      "selected:bg-primary selected:text-primary-foreground",
      "data-[open=true]:bg-primary data-[open=true]:text-primary-foreground",
      "hover:bg-secondary hover:text-secondary-foreground",
      "focus-visible:ring-3 focus-visible:ring-primary-foreground/15",
    ],
  },
})

const { item, box } = styles()

export { box, item }
