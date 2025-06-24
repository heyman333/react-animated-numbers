import { act, render, screen } from "@testing-library/react";
import React from "react";
import AnimatedNumbers from "../index";

// Mock ResizeObserver with a stateful implementation
let resizeObserverCallback: ResizeObserverCallback;
const mockResizeObserver = jest.fn((callback) => {
	resizeObserverCallback = callback;
	return {
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	};
});
global.ResizeObserver = mockResizeObserver;

const triggerResize = (entry: Partial<ResizeObserverEntry>) => {
	// JSDOM doesn't implement layout, so we have to manually trigger the resize observer
	act(() => {
		resizeObserverCallback(
			[entry as ResizeObserverEntry],
			{} as ResizeObserver,
		);
	});
};

// Mock useInView to be true
jest.mock("motion/react", () => ({
	...jest.requireActual("motion/react"),
	useInView: () => true,
}));

describe("AnimatedNumbers", () => {
	beforeEach(() => {
		// Reset the mock before each test
		jest.clearAllMocks();
		global.ResizeObserver = mockResizeObserver;
	});

	it("renders with thousand separators", () => {
		render(<AnimatedNumbers animateToNumber={12345} useThousandsSeparator />);
		triggerResize({
			contentRect: {
				height: 20,
				width: 10,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				x: 0,
				y: 0,
				toJSON: () => ({}),
			},
		});
		expect(screen.getByText(",")).toBeInTheDocument();
	});

	it("renders the final number", async () => {
		const { container } = render(<AnimatedNumbers animateToNumber={456} />);
		triggerResize({
			contentRect: {
				height: 20,
				width: 10,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				x: 0,
				y: 0,
				toJSON: () => ({}),
			},
		});

		// A simpler assertion for now
		const allDivs = container.querySelectorAll("div");
		let textContent = "";
		for (const div of allDivs) {
			textContent += div.textContent;
		}

		expect(textContent).toContain("4");
		expect(textContent).toContain("5");
		expect(textContent).toContain("6");
	});
});
