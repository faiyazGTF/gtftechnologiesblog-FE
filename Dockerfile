# Use the standard Node image as per your backend template
FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install

# Copy the rest of the application
COPY . .

# Set build-time environment variables for Next.js
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_API_ADMIN_URL
ARG NEXT_PUBLIC_ADMIN_URL
ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_ADMIN_URL=$NEXT_PUBLIC_API_ADMIN_URL
ENV NEXT_PUBLIC_ADMIN_URL=$NEXT_PUBLIC_ADMIN_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build the project
RUN npm run build

# Install a simple static server since 'output: export' is enabled
RUN npm install -g serve

# Expose port 3007
EXPOSE 3007

# Start serving the 'out' directory on 3007
CMD ["serve", "-s", "out", "-l", "3007"]
