/// <reference types="cypress" />

describe("Basic", () => {
  it("should work for basic scenario", () => {
    cy.intercept("POST", "/api/v1/event", {
      statusCode: 200,
    }).as("apiEvent");

    let requestCount = 0;

    cy.intercept(
      "GET",
      "/api/v1/savegame/talentApplicationProfileTwo",
      (req) => {
        requestCount++;

        if (requestCount === 1) {
          req.reply({
            statusCode: 200,
            body: {
              applicationId: "webflow",
              state: JSON.stringify(getSavegame(true)),
            },
          });
        } else {
          req.continue();
        }
      }
    ).as("apiSavegame");

    // Login
    cy.visit(
      "/?sid=talent-digital-canary-season&eid=1&redirectUrl=https://devtd2.talentdigit.al"
    );
    cy.origin(Cypress.env("devUrl"), () => {
      cy.get("#username").type(Cypress.env("username"));
      cy.get("#password").type(Cypress.env("password"));

      cy.get("button[type='submit']").click();
    });

    // Pass test and go to next page
    cy.get("#action-pass").should("exist").click();

    cy.wait("@apiEvent").then((interception) => {
      const body = interception.request.body;
      const timestamp = body.events[0].payload.timestamp;

      const expectedBody = {
        applicationId: "talentApplicationProfileTwo",
        events: [
          {
            type: "test.complete",
            payload: {
              test: "secure-password",
              data: {},
              failed: false,
              timestamp,
            },
            result: { id: "secure-password", value: 1 },
          },
        ],
        seasonId: "talent-digital-canary-season",
        episodeId: "1",
      };

      expect(body).to.deep.equal(expectedBody);
    });

    // Go to index and see if savegame mechanism redirects to the next page
    cy.wait("@apiSavegame")
      .wait(1000)
      .visit(
        "/?sid=talent-digital-canary-season&eid=1&redirectUrl=https://devtd2.talentdigit.al"
      );
    cy.get("h2").contains("Pass");

    // Fail test and go to next page
    cy.get("#action-fail").should("exist").click();

    cy.wait("@apiEvent").then((interception) => {
      const body = interception.request.body;
      const timestamp = body.events[0].payload.timestamp;

      const expectedBody = {
        applicationId: "talentApplicationProfileTwo",
        events: [
          {
            type: "test.complete",
            payload: {
              test: "secure-password",
              data: {},
              failed: true,
              timestamp,
            },
            result: { id: "secure-password", value: 0 },
          },
        ],
        seasonId: "talent-digital-canary-season",
        episodeId: "1",
      };

      expect(body).to.deep.equal(expectedBody);
    });

    cy.get("h2").contains("Fail");

    // Go to end page
    cy.get("#action-go-to-end").should("exist").click();
    cy.get("h2").contains("End");

    // End episode
    cy.get("#action-end").should("exist").click();

    cy.wait("@apiEvent").then((interception) => {
      const body = interception.request.body;

      const expectedBody = {
        applicationId: "talentApplicationProfileTwo",
        events: [
          {
            eventTypeId: "episode.end",
            season: "talent-digital-canary-season",
            episode: "1",
          },
        ],
        seasonId: "talent-digital-canary-season",
        episodeId: "1",
      };

      expect(body).to.deep.equal(expectedBody);
    });

    cy.origin(Cypress.env("devUrl"), () => {
      cy.url().should("include", "https://devtd2.talentdigit.al");
    });
  });
});

const getSavegame = () => ({
  SEASONS: {
    "talent-digital-canary-season": {
      1: {
        savegame: {
          lastPlayedUrl: undefined,
        },
      },
    },
  },
});
