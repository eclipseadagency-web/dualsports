"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const AddToCartButton = ({ isPending, quantity }) => {
  if (quantity < 1) {
    return (
      <p className="bg-red-400/30 mt-4 p-2 text-red-700 rounded-lg">
        this variation is out of stock
      </p>
    );
  }
  return (
    <div className="flex items-center gap-2 mt-5">
      <Button disabled={isPending}>
        Add To Cart{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </Button>

      {isPending && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          width={50}
          height={50}
        >
          <radialGradient
            id="a12"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stopColor="#3B82F6"></stop>
            <stop offset=".3" stopColor="#3B82F6" stopOpacity=".9"></stop>
            <stop offset=".6" stopColor="#3B82F6" stopOpacity=".6"></stop>
            <stop offset=".8" stopColor="#3B82F6" stopOpacity=".3"></stop>
            <stop offset="1" stopColor="#3B82F6" stopOpacity="0"></stop>
          </radialGradient>
          <circle
            transformOrigin="center"
            fill="none"
            stroke="url(#a12)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
          <circle
            transformOrigin="center"
            fill="none"
            opacity=".2"
            stroke="#3B82F6"
            strokeWidth="4"
            strokeLinecap="round"
            cx="100"
            cy="100"
            r="70"
          ></circle>
        </svg>
      )}
    </div>
  );
};

export default AddToCartButton;
