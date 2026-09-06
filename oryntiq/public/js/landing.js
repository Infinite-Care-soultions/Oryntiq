(function () {
	const header = document.getElementById("siteHeader");
	const toggle = document.getElementById("navToggle");
	const links = document.getElementById("navLinks");
	const year = document.getElementById("year");

	if (year) {
		year.textContent = String(new Date().getFullYear());
	}

	const onScroll = () => {
		if (!header) return;
		header.classList.toggle("is-scrolled", window.scrollY > 24);
	};
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });

	if (toggle && links) {
		toggle.addEventListener("click", () => {
			const open = links.classList.toggle("is-open");
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
		});

		links.querySelectorAll("a").forEach((anchor) => {
			anchor.addEventListener("click", () => {
				links.classList.remove("is-open");
				toggle.setAttribute("aria-expanded", "false");
			});
		});
	}

	const reveals = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
		);
		reveals.forEach((el) => observer.observe(el));
	} else {
		reveals.forEach((el) => el.classList.add("is-visible"));
	}

	const form = document.getElementById("contactForm");
	if (form) {
		form.addEventListener("submit", (event) => {
			event.preventDefault();
			const data = new FormData(form);
			const name = String(data.get("name") || "").trim();
			const email = String(data.get("email") || "").trim();
			const interest = String(data.get("interest") || "").trim();
			const message = String(data.get("message") || "").trim();
			const subject = encodeURIComponent(`ORYNTIQ inquiry: ${interest || "Business Central"}`);
			const body = encodeURIComponent(
				`Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`
			);
			window.location.href = `mailto:info@oryntiqdt.com?subject=${subject}&body=${body}`;
		});
	}
})();
