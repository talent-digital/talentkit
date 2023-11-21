import { Box, Divider, IconButton, TextField, styled } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

const defaultTextFieldTestValue = `
id: frag12
episode: 13
level: FOUNDATION
documentation: Ich bin in der Lage, spezifische Nachrichten im Internet zu finden.
search:
  links: www.tomato.com, www.pumpkin.com
`.trim();

export const AppContainer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 4,
        padding: 4,
      }}
    >
      <SectionWrapper>
        <h3>Basic information</h3>
        <TextField label="title" variant="outlined" sx={{ width: "100%" }} />
        <TextField label="info" variant="outlined" sx={{ width: "100%" }} />
        <TextField
          label="assetsURL"
          variant="outlined"
          sx={{ width: "100%" }}
        />
        <TextField
          label="seasonEndMessage"
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </SectionWrapper>

      <SectionWrapper>
        <h3>Episodes</h3>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="id" variant="outlined" sx={{ width: "100%" }} />
          <TextField label="title" variant="outlined" sx={{ width: "100%" }} />
          <TextField
            label="description"
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </Box>
        <div>
          <IconButton color="success" aria-label="add">
            <AddIcon />
          </IconButton>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <h3>Competence Areas</h3>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="id" variant="outlined" sx={{ width: "33%" }} />
          <TextField label="name" variant="outlined" sx={{ width: "100%" }} />
        </Box>
        <div>
          <IconButton color="success" aria-label="add">
            <AddIcon />
          </IconButton>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <h3>Competences</h3>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="id" variant="outlined" sx={{ width: "100%" }} />
          <TextField
            label="competence area id"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField label="name" variant="outlined" sx={{ width: "100%" }} />
        </Box>
        <div>
          <IconButton color="success" aria-label="add">
            <AddIcon />
          </IconButton>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <h3>Sub competences</h3>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="id" variant="outlined" sx={{ width: "100%" }} />
          <TextField
            label="competence id"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField label="name" variant="outlined" sx={{ width: "100%" }} />
        </Box>
        <div>
          <IconButton color="success" aria-label="add">
            <AddIcon />
          </IconButton>
        </div>
      </SectionWrapper>

      {/* We can omit the id and generate it but then there might be problem when we import a yaml file */}
      <SectionWrapper>
        <h3>Test items</h3>
        <TextField
          label="Test item"
          variant="outlined"
          sx={{ width: "100%" }}
          defaultValue={defaultTextFieldTestValue}
          multiline
          rows={6}
        />
        <div>
          <IconButton color="success" aria-label="add">
            <AddIcon />
          </IconButton>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <h3>Test items (concept2)</h3>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="id" variant="outlined" sx={{ width: "100%" }} />
          <TextField
            label="episode"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField label="level" variant="outlined" sx={{ width: "100%" }} />
        </Box>
        <TextField
          label="documentation"
          variant="outlined"
          sx={{ width: "100%" }}
        />
        <TextField label="search" variant="outlined" sx={{ width: "100%" }} />

        <h3>Test item</h3>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="id" variant="outlined" sx={{ width: "100%" }} />
          <TextField
            label="episode"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField label="level" variant="outlined" sx={{ width: "100%" }} />
        </Box>
        <TextField
          label="documentation"
          variant="outlined"
          sx={{ width: "100%" }}
        />
        <TextField label="search" variant="outlined" sx={{ width: "100%" }} />

        <div>
          <IconButton color="success" aria-label="add">
            <AddIcon />
          </IconButton>
        </div>
      </SectionWrapper>
    </Box>
  );
};

const SectionWrapper = styled("div")(() => ({
  boxShadow: `3px 3px 10px rgba(0, 0, 0, 0.3)`,
  borderRadius: 4,
  padding: 16,
  width: 800,
  display: "flex",
  gap: 16,
  flexDirection: "column",
  background: "white",
}));
