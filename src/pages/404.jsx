import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | GTF Technologies</title>
        <meta
          name="description"
          content="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <section className="d-flex align-items-center justify-content-center text-center py-5" style={{ minHeight: "70vh" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <h1
                style={{
                  fontSize: "clamp(4.5rem, 12vw, 8rem)",
                  fontWeight: 700,
                  color: "#2aaee4",
                  lineHeight: 1,
                  marginBottom: "1rem",
                  fontFamily: "Oswald-Bold, sans-serif",
                }}
              >
                404
              </h1>

              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  color: "#222",
                  fontFamily: "Oswald-Medium, sans-serif",
                }}
              >
                Oops! Page Not Found
              </h2>

              <p
                className="text-muted mb-4"
                style={{
                  fontSize: "1rem",
                  maxWidth: "480px",
                  margin: "0 auto 1.5rem",
                  lineHeight: "1.6",
                }}
              >
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>

              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link
                  href="/"
                  className="btn btn-primary px-4 py-2"
                  style={{
                    backgroundColor: "#2aaee4",
                    borderColor: "#2aaee4",
                    borderRadius: "4px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
