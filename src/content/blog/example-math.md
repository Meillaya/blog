---
title: "Example Math Equations with LaTeX"
publishDate: 2023-04-15
description: "Demonstrating LaTeX equation rendering in markdown"
---

# Using LaTeX in Markdown

This page demonstrates how to use LaTeX for typesetting mathematical equations in your markdown files.

## Inline Equations

You can include inline equations by surrounding your LaTeX code with single dollar signs. For example, the formula for the quadratic formula $ax^2 + bx + c = 0$ has the solution $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.

Einstein's famous equation is $E = mc^2$, which relates energy and mass.

## Block Equations

For more complex equations or to display them centered on their own line, use double dollar signs:

$$
\begin{aligned}
\nabla \times \vec{B} -\frac{1}{c}\frac{\partial\vec{E}}{\partial t} &= \frac{4\pi}{c}\vec{j} \\
\nabla \cdot \vec{E} &= 4 \pi \rho \\
\nabla \times \vec{E} + \frac{1}{c}\frac{\partial\vec{B}}{\partial t} &= \vec{0} \\
\nabla \cdot \vec{B} &= 0
\end{aligned}
$$

These are Maxwell's equations in their differential form.

## More Examples

Here's the Fourier transform:

$$
F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} dt
$$

And here's the Gaussian distribution:

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}
$$

## Matrix Example

You can also typeset matrices:

$$
\begin{pmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{pmatrix}
$$

## Euler's Identity

One of the most beautiful equations in mathematics:

$$
e^{i\pi} + 1 = 0
$$

This combines five fundamental constants in mathematics into one elegant equation. 