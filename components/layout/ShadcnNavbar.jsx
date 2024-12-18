"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavigationMenuDemo({ category, subCategory }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {category.map((cat) => {
          const thisCategorySubcategories = subCategory.filter(
            (sub) => sub.categoryId == cat.id
          );

          return (
            <NavigationMenuItem key={cat.id}>
              {thisCategorySubcategories.length > 0 ? (
                <>
                  <NavigationMenuTrigger>
                    <Link href={`/category/${cat.id}`}>{cat.name}</Link>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {thisCategorySubcategories.map((component) => (
                        <ListItem
                          key={component.id}
                          title={component.name}
                          href={`/category/${cat.id}/${component.id}`}
                        >
                          {parse(component.short_description)}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={`/category/${cat.id}`} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {cat.name}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
